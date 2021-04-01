import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "fbConfig";

import {
  faAngleRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TweetContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`;
const FirstColumn = styled.div`
  flex: 1;
  margin-right: 16px;
`;
const SecondColumn = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const FontBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.1);
    transform: rotate(360deg);
    color: red;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Text = styled.div`
  font-size: 24px;
  width: 350px;
  word-wrap: break-word;
`;
const Name = styled.div`
  color: #505050;
`;
const Img = styled.img`
  width: 350px;
  border-radius: 16px;
`;
const ImgBox = styled.div`
  margin-top: 16px;
`;
const EditForm = styled.form`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;
const EditInput = styled.input`
  border: none;
  font-size: 24px;
  outline: none;
  margin: 0;
  padding: 0;
`;

const Tweet = ({ tweet, isAuthor, db }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);

  const handleDelete = async () => {
    const ok = window.confirm("삭제하시겠습니까");
    if (ok) {
      await db.collection("tweets").doc(tweet.id).delete();
      tweet.imageUrl && (await storage.refFromURL(tweet.imageUrl).delete());
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await db.collection("tweets").doc(tweet.id).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  return (
    <div>
      <TweetContainer>
        <FirstColumn>
          <ProfileImg src={tweet.photoURL} />
        </FirstColumn>
        <SecondColumn>
          <Flex>
            <Name>{tweet.displayName}</Name>
            {isAuthor && (
              <div>
                <FontBtn onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </FontBtn>
                <FontBtn onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                </FontBtn>
              </div>
            )}
          </Flex>
          {editing ? (
            <EditForm onSubmit={handleSubmit}>
              <EditInput
                type="text"
                placeholder={tweet.text}
                required
                onChange={handleChange}
              />
              <FontBtn>
                <FontAwesomeIcon icon={faAngleRight} size="2x" />
              </FontBtn>
            </EditForm>
          ) : (
            <Text>{tweet.text}</Text>
          )}
          {tweet.imageUrl && (
            <ImgBox>
              <Img src={tweet.imageUrl} />
            </ImgBox>
          )}
        </SecondColumn>
      </TweetContainer>
    </div>
  );
};

export default Tweet;
