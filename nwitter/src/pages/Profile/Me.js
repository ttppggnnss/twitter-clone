import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import useAuth from 'hooks/useAuth';

const Profile = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <button onClick={logout}>Log Out</button>
    </>
  );
};

export default Profile;
