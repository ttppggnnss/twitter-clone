import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from 'routes';

import Me from 'components/Profile/Me';
import Edit from 'components/Profile/Edit';

const Profile = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.PROFILE.ME}>
          <Me />
        </Route>
        <Route path={ROUTES.PROFILE.EDIT}>
          <Edit />
        </Route>
        <Redirect to={ROUTES.PROFILE.ME} />
      </Switch>
    </>
  );
};

export default Profile;
