import React from 'react';
import {
  BrowserRouter as Router, // 주소에 # 붙어서 HashRouter 안씀
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navigation from 'components/Common/Navigation';
import Footer from 'components/Common/Footer';

import useAuth from 'hooks/useAuth';

// pages
import { Sign } from 'pages/Auth';
import { Main } from 'pages/Home';
import { Edit, Me } from 'pages/Profile';

const Routes = () => {
  const { userObj } = useAuth();
  return (
    <>
      <Router>
        {userObj && <Navigation />}
        <Switch>
          {userObj ? (
            <>
              {/* Home */}
              <Route exact path="/home">
                <Main />
              </Route>
              {/* Profile */}
              <Route exact path="/profile/me">
                <Me />
              </Route>
              <Route exact path="/profile/edit">
                <Edit />
              </Route>
            </>
          ) : (
            <>
              {/* Auth */}
              <Route exact path="/auth/sign">
                <Sign />
              </Route>
            </>
          )}

          {/* Redirect */}
          {userObj ? (
            <Redirect from="*" to="/home" />
          ) : (
            <Redirect from="*" to="/auth/sign" />
          )}
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Routes;
