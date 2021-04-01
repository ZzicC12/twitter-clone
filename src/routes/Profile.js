import React, { useRef, useState } from "react";
import styled from "styled-components";
import { storage } from "fbConfig";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCamera,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Img = styled.img`
  display: block;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 48px auto;
`;

const Title = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 48px;
  line-height: 32px;
`;

const Label = styled.label`
  transition: all 300ms ease-in-out;
  cursor: pointer;
  color: #34495e;
  &:hover {
    transform: scale(1.2);
    color: #3498db;
  }
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  display: none;
`;

const Form = styled.form`
  text-align: center;
  margin-bottom: 48px;
  height: 32px;
  display: flex;
  justify-content: center;
`;

const InputText = styled.input`
  height: 100%;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 24px;
`;

const Button = styled.button`
  outline: none;
  border: none;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  color: #34495e;
  &:hover {
    transform: scale(1.2);
    color: #3498db;
  }
`;

const Profile = ({ authService }) => {
  const user = authService.getCurrentUser();
  const [text, setText] = useState("");
  const [toggleInput, setToggleInput] = useState(false);
  const ref = useRef();
  let downloadUrl;

  const handleUpload = async ({ target: { files } }) => {
    if (user.photoURL) {
      const previousRef = storage.refFromURL(user.photoURL);
      previousRef.delete();
    }
    const fileRef = storage.ref().child(`profile/${user.uid}/${uuidv4()}`);
    const file = await fileRef.put(files[0]);
    downloadUrl = await file.ref.getDownloadURL();
    user.updateProfile({ photoURL: downloadUrl });
  };

  const handleToggle = () => setToggleInput((prev) => !prev);

  const handleChange = ({ target: { value } }) => setText(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    user.updateProfile({ displayName: text });
    handleToggle();
    setText("");
  };

  return (
    <>
      <Img src={user.photoURL} />
      {toggleInput ? (
        <Form onSubmit={handleSubmit}>
          <InputText
            id="name"
            type="text"
            placeholder={user.displayName}
            onChange={handleChange}
          />
          <Button>
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
          </Button>
        </Form>
      ) : (
        <Title>{user.displayName}</Title>
      )}
      <Div>
        <Label htmlFor="name" onClick={handleToggle}>
          <FontAwesomeIcon icon={faEdit} size="3x" />
        </Label>
        <Label htmlFor="file">
          <FontAwesomeIcon icon={faCamera} size="3x" />
        </Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={ref}
        />
      </Div>
    </>
  );
};

export default Profile;
