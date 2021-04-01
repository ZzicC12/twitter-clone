import React, { useRef, useState } from "react";
import styled from "styled-components";
import { storage } from "fbConfig";
import { v4 as uuidv4 } from "uuid";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 0;
`;

const Input = styled.input`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 16px 8px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const InputFile = styled.input`
  display: none;
`;

const Submit = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const Btn = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageBox = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FontBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.1);
    color: red;
  }
`;

const TweetForm = ({ authService, db }) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const handleChange = (event) => setText(event.target.value);
  const ref = useRef();
  const user = authService.getCurrentUser();

  const handleSubmit = async (event) => {
    let downloadUrl = "";
    event.preventDefault();
    const fileRef = storage.ref().child(`${user.uid}/${uuidv4()}`);
    if (url) {
      const file = await fileRef.putString(url, "data_url");
      downloadUrl = await file.ref.getDownloadURL();
    }
    const tweetObj = {
      text,
      created: Date.now(),
      author: user.uid,
      imageUrl: downloadUrl,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    await db
      .collection("tweets")
      .add(tweetObj)
      .then(() => setText(""))
      .then(() => handleClear());
  };

  const handleUpload = ({ target: { files } }) => {
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => setUrl(result);
    files[0] && reader.readAsDataURL(files[0]);
  };

  const handleClear = () => {
    setUrl(null);
    ref.current.value = "";
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Write a message..."
          maxLength="120"
        />
        <Submit>
          <Label htmlFor="file">
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </Label>
          <Btn>tweet</Btn>
        </Submit>
        <InputFile
          id="file"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={ref}
        />
      </Form>
      {url && (
        <ImageBox>
          <img src={url} width="100px" height="100px" alt="tweet" />
          <FontBtn onClick={handleClear}>
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </FontBtn>
        </ImageBox>
      )}
    </>
  );
};

export default TweetForm;
