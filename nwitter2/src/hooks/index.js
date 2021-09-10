import { useAuthDispatch, useAuthState } from 'contexts/AuthContext';

const stateMap = {
    auth: useAuthState,
};

const dispatchMap = {
    auth: useAuthDispatch,
};

export const useSelector = (callback) => {
    return callback(stateMap)();
};

export const useDispatch = (callback) => {
    return callback(dispatchMap)();
};
