import React, { useRef, useState } from "react";
import styled from "styled-components";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Label = styled.label`
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const InputFile = styled.input`
  display: none;
`;

const UploadPhoto = () => {
  const [url, setUrl] = useState("");
  const ref = useRef();

  const handleUpload = ({ target: { files } }) => {
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => setUrl(result);
    files[0] && reader.readAsDataURL(files[0]);
  };
  console.log(url);
  return (
    <>
      <Label htmlFor="file">
        <FontAwesomeIcon icon={faCamera} size="2x" />
      </Label>
      <InputFile
        id="file"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={ref}
      />
    </>
  );
};

export default UploadPhoto;
