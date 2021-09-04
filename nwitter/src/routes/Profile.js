import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    history.push("/");
  };
  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
