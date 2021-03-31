import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "components/Context";
import Tweet from "components/Tweet";
import { storage } from "fbConfig";

const Home = ({ db }) => {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [url, setUrl] = useState("");
  const ref = useRef();

  const {
    state: { user },
  } = Context();

  const handleChange = (event) => setText(event.target.value);

  const handleSubmit = async (event) => {
    let downloadUrl = "";
    event.preventDefault();
    const fileRef = storage.ref().child(`${user.info.uid}/${uuidv4()}`);
    if (url) {
      const file = await fileRef.putString(url, "data_url");
      downloadUrl = await file.ref.getDownloadURL();
    }
    const tweetObj = {
      text,
      created: Date.now(),
      author: user.info.uid,
      imageUrl: downloadUrl,
    };

    await db
      .collection("tweets")
      .add(tweetObj)
      .then(setText(""))
      .then(handleClear());
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
        <input type="file" accept="image/*" onChange={handleUpload} ref={ref} />
      </form>
      {url && (
        <div>
          <img src={url} width="50px" height="50px" />
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
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
