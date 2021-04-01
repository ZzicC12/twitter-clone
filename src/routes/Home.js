import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "fbConfig";
import Tweet from "components/Tweet";
import TweetForm from "components/TweetForm";

const Section = styled.section`
  width: 90%;
  margin: auto;
  height: 70%;
  overflow-y: auto;
`;

const Home = ({ authService }) => {
  const [tweets, setTweets] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    db.collection("tweets")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        const allTweets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(allTweets);
      });
  }, []);

  return (
    <>
      <TweetForm db={db} authService={authService} />
      <Section>
        {tweets.map((item, index) => (
          <Tweet
            tweet={item}
            key={index}
            isAuthor={item.author === user.uid}
            db={db}
            authService={authService}
          />
        ))}
      </Section>
    </>
  );
};

export default Home;
