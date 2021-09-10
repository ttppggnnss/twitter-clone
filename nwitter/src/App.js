import React, { useEffect, useState } from 'react';
import Routes from 'routes';

import useAuth from 'hooks/useAuth';

const App = () => {
  const { init, onWatching } = useAuth();
  useEffect(() => {
    // check user state
    onWatching();
  }, [onWatching]);
  return <>{init ? <Routes /> : 'Initializing....'}</>;
};

export default App;
