import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    history.push('/');
  };
  return (
    <>
      <h1>Profile</h1>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
