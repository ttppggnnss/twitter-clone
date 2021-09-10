import {
  useAuthDispatch,
  useAuthState,
  // useFirestoreDispatch,
  // useFirestoreState,
} from 'contexts';

const stateMap = {
  auth: useAuthState,
  // firestore: useFirestoreState,
};

const dispatchMap = {
  auth: useAuthDispatch,
  // firestore: useFirestoreDispatch,
};

export const useSelector = (callback) => {
  return callback(stateMap)();
};

export const useDispatch = (callback) => {
  return callback(dispatchMap)();
};
