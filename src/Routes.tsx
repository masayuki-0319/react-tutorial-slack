import React, { useEffect, VFC } from 'react';
import { connect, Provider } from 'react-redux';
import { Switch, Route, useHistory, withRouter, BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser } from './actions';

import { auth, onAuthStateChanged } from './api/auth';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { rootReducer } from './reducers';

const Routes: VFC = () => {
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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

const RootWithAuth = withRouter(connect(null, { setUser })(Routes));
const store = createStore(rootReducer, composeWithDevTools());

export const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootWithAuth />
      </BrowserRouter>
    </Provider>
  );
};
