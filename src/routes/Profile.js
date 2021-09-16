import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const history = useHistory();
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
