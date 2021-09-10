import React, { createContext, useReducer, useContext } from 'react';
import firebaseApp from 'models/firebaseApp';
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
import { createAction } from 'utils/createAction';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const getUserAction = createAction('auth/getUser');
export const signAction = createAction('auth/sign');
export const socialAction = createAction('auth/social');
export const logoutAction = createAction('auth/logout');
export const resetErrorAction = createAction('auth/resetError');
export const toggleAction = createAction('auth/toggle');

const authReducer = (state, action) => {
  const { type, payload } = action;
  const auth = getAuth();
  switch (type) {
    case 'auth/getUser':
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return { ...state, userObj: user, init: true };
        }
        return { ...state, init: true };
      });
      break;
    case 'auth/sign':
      (async (payload) => {
        // {event, email, password}
        payload.event.preventDefault();
        if (state.newAccount) {
          // create account
          await createUserWithEmailAndPassword(
            auth,
            payload.email,
            payload.password,
          )
            .then((userCredential) => {
              const { user } = userCredential;
              return { ...state, userObj: user };
            })
            .catch((error) => {
              return { ...state, error: error.code.substr(5) };
            });
        } else {
          // log in
          await signInWithEmailAndPassword(
            auth,
            payload.email,
            payload.password,
          )
            .then((userCredential) => {
              const { user } = userCredential;
              return { ...state, userObj: user };
            })
            .catch((error) => {
              return { ...state, error: error.code.substr(5) };
            });
        }
      })();
      return state;
    case 'auth/social':
      (async (payload) => {
        // {event}
        const {
          target: { name },
        } = payload.event;
        let provider;
        if (name === 'google') {
          provider = new GoogleAuthProvider();
          provider.addScope(
            'https://www.googleapis.com/auth/contacts.readonly',
          );
        } else if (name === 'github') {
          provider = new GithubAuthProvider();
          provider.addScope('repo');
        }
        await signInWithPopup(auth, provider).catch((error) => {
          return { ...state, error2: error.code.substr(5) };
        });
      })();
      return state;
    case 'auth/logout':
      signOut(auth);
      return { ...state, userObj: null };
    case 'auth/resetError':
      return { ...state, error: '', error2: '' };
    case 'auth/toggle':
      return { ...state, newAccount: !state.newAccount };
    default:
      return state;
  }
  return state;
};

export const useAuthState = () => {
  const state = useContext(AuthStateContext);

  return state;
};

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);

  return dispatch;
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userObj: null,
    error: '',
    error2: '',
    init: false,
    newAccount: true,
  });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthContextProvider;

/*

const AuthContextProvider = ({ children }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const auth = getAuth();

  const loginSignup = async (event, email, password) => {
    event.preventDefault();
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
    signOut(auth);
    history.push('/sign');
  };

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // check user state
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
  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

*/
