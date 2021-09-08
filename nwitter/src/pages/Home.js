import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from 'routes';

import Main from 'components/Home/Main';

const Home = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.HOME.MAIN}>
          <Main />
        </Route>
        <Redirect to={ROUTES.HOME.MAIN} />
      </Switch>
    </>
  );
};

export default Home;
