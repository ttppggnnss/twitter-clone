import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // check user state
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing....'
      )}
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
