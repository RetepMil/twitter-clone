import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Jjik from "components/Jjik";
import JjikFactory from "components/JjikFactory";

const Home = ({ userObj }) => {
  const [jjiks, setjjiks] = useState([]);

  useEffect(() => {
    const getData = dbService.collection("jjiks").onSnapshot((snapshot) => {
      const jjikArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setjjiks(jjikArray);
    });
    return () => getData();
  }, []);

  return (
    <div className="container">
      <JjikFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
