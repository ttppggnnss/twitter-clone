import React from 'react';
import {
  BrowserRouter as Router, // 주소에 # 붙어서 HashRouter 안씀
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import WrappedComponent from 'components/Component/WrappedComponent';
import ROUTES from 'routes';

import Navigation from 'components/Common/Navigation';
import Footer from 'components/Common/Footer';

import useAuth from 'hooks/useAuth';

// pages
const Home = WrappedComponent(() => import('pages/Home'));
const Auth = WrappedComponent(() => import('pages/Auth'));
const Profile = WrappedComponent(() => import('pages/Profile'));

const AppRouter = () => {
  const { userObj } = useAuth();

  return (
    <>
      <Router>
        {userObj && <Navigation />}
        <Switch>
          <Route exact path={ROUTES.HOME.MAIN} component={Home} />
          <Route exact path={ROUTES.AUTH.MAIN} component={Auth} />
          <Route exact path={ROUTES.PROFILE.MAIN} component={Profile} />
          <Redirect from="*" to={ROUTES.HOME.MAIN} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default AppRouter;
