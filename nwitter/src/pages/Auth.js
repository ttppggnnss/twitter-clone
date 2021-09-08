import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from 'routes';

import Sign from 'components/Auth/Sign';

import useAuth from 'hooks/useAuth';
import { useHistory } from 'react-router';

const Auth = () => {
  const { userObj } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (userObj) {
      history.push(ROUTES.HOME.MAIN);
    }
  }, [userObj, history]);
  return (
    <>
      <Switch>
        <Route exact path={ROUTES.AUTH.SIGN}>
          <Sign />
        </Route>
        <Redirect to={ROUTES.AUTH.SIGN} />
      </Switch>
    </>
  );
};

export default Auth;
