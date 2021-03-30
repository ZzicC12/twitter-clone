import React, { useState } from "react";

const Tweet = ({ tweet, isAuthor, db }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);

  const handleDelete = async () => {
    const ok = window.confirm("삭제하시겠습니까");
    ok && (await db.collection("tweets").doc(tweet.id).delete());
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
      {editing ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newTweet}
              required
              onChange={handleChange}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {isAuthor && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
