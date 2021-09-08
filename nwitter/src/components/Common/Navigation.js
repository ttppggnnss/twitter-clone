import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import ROUTES from 'routes';
import useAuth from 'hooks/useAuth';

const Navigation = () => {
  const { logout, userObj } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!userObj) {
      history.push(ROUTES.AUTH.SIGN);
    }
  }, [userObj, history]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.HOME.MAIN}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.PROFILE.ME}>My Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
