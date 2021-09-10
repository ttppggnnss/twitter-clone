import React, { createContext, useReducer, useContext } from 'react';
import { createAction } from 'utils';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const socialAction = createAction('auth/social');
export const logoutAction = createAction('auth/logout');
export const testAction = createAction('auth/test');

const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'auth/social':
            return state;
        case 'auth/logout':
            return { ...state, userObj: null };
        case 'auth/test':
            return { ...state, test: payload.test };
        default:
            return state;
    }
};

export const useAuthState = () => {
    const state = useContext(AuthStateContext);

    return state;
};

export const useAuthDispatch = () => {
    const dispatch = useContext(AuthDispatchContext);

    return dispatch;
};

const initialAuthState = {
    userObj: null,
    test: 'test',
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
};

export default AuthContextProvider;
