import React from 'react';

import AuthContextProvider from 'contexts/AuthContextProvider';
// import FirestoreContextProvider from 'contexts/FirestoreContextProvider'

export const ContextProvider = (...Provider) => {
  const RootContextProvider = ({ children }) => {
    let temp = children;
    Provider.forEach((Prov) => {
      temp = <Prov>{temp}</Prov>;
    });
    return temp;
  };

  return ({ children }) => {
    <RootContextProvider>{children}</RootContextProvider>;
  };
};

const RootContext = ContextProvider(
  AuthContextProvider,
  //   FirestoreContextProvider,
);

export default RootContext;
