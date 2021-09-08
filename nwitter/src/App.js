import React, { useEffect, useState } from 'react';
import AppRouter from 'routes/AppRouter';

import useAuth from 'hooks/useAuth';

const App = () => {
  const { init, onWatching } = useAuth();
  useEffect(() => {
    // check user state
    onWatching();
  }, [onWatching]);
  return <>{init ? <AppRouter /> : 'Initializing....'}</>;
};

export default App;
