import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Jjik from "components/Jjik";

const Home = ({ userObj }) => {
  const [jjik, setJjik] = useState("");
  const [jjiks, setjjiks] = useState([]);

  useEffect(() => {
    dbService.collection("jjiks").onSnapshot((snapshot) => {
      const jjikArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setjjiks(jjikArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("jjiks").add({
      text: jjik,
      createdAt: Date.now(),
      createrId: userObj.uid,
    });
    setJjik("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJjik(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={jjik}
          onChange={onChange}
          type="text"
          placeholder="하고 싶은 말 여기에 찍쓰!"
          maxLength={120}
        />
        <input type="submit" value="JJik" />
      </form>
      <div>
        {jjiks.map((jjik) => (
          <Jjik
            key={jjik.id}
            jjikObj={jjik}
            isOwner={jjik.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
