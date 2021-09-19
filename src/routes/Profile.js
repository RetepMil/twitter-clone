import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyJjiks = async () => {
    const jjiks = await dbService
      .collection("jjiks")
      .where("createrId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(jjiks.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyJjiks();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
