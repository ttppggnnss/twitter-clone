import firebaseApp from 'models/firebaseApp';

import { useState } from 'react';
import { useHistory } from 'react-router';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const useAuth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const loginSignup = async (event, email, password) => {
    event.preventDefault();
    const auth = getAuth();
    if (newAccount) {
      // create account
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          return user;
        })
        .catch((error) => {
          setError(error.code.substr(5));
        });
    } else {
      // log in
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          return user;
        })
        .catch((error) => {
          setError(error.code.substr(5));
        });
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    setError('');
  };

  const onSocialClick = async (event) => {
    const auth = getAuth();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
      provider.addScope('repo');
    }
    await signInWithPopup(auth, provider).catch((error) => {
      setError2(error.code.substr(5));
    });
  };

  const history = useHistory();

  const logout = () => {
    const auth = getAuth();
    signOut(auth);
    history.push('/sign');
  };

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // check user state
  const auth = getAuth();
  const onWatching = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  };
  return {
    newAccount,
    error,
    error2,
    loginSignup,
    toggleAccount,
    onSocialClick,
    logout,
    init,
    userObj,
    onWatching,
  };
};

export default useAuth;
