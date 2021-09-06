import React, { useEffect, VFC } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { auth, onAuthStateChanged } from './api/auth';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

export const Routes: VFC = () => {
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push('/');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
