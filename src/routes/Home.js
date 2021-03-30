import React, { useEffect, useState } from "react";
import { Context } from "components/Context";
import Tweet from "components/Tweet";

const Home = ({ db }) => {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);

  const {
    state: { user },
  } = Context();

  const handleChange = (event) => setText(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await db
      .collection("tweets")
      .add({
        text,
        created: Date.now(),
        author: user.info.uid,
      })
      .then(setText(""));
  };

  useEffect(() => {
    db.collection("tweets").onSnapshot((snapshot) => {
      const allTweets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(allTweets);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Write a message..."
        />
        <input type="submit" value="tweet" />
      </form>
      <section>
        {tweets.map((item, index) => (
          <Tweet
            tweet={item}
            key={index}
            isAuthor={item.author === user.info.uid}
            db={db}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
