import { UserContext } from "components/Context";
import React, { useContext, useState } from "react";

const Home = ({ db }) => {
  const [text, setText] = useState("");

  const {
    state: { user },
  } = useContext(UserContext);

  console.log(user);

  const handleChange = (event) => setText(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await db
      .collection("tweets")
      .add({
        text,
        created: Date.now(),
      })
      .then(setText(""));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Write a message..."
      />
      <input type="submit" value="tweet" />
    </form>
  );
};

export default Home;
