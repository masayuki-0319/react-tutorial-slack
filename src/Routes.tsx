import React, { useEffect, VFC } from 'react';
import { connect, Provider, useSelector } from 'react-redux';
import { Switch, Route, useHistory, withRouter, BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser } from './actions';

import { auth, onAuthStateChanged } from './api/auth';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Spinner } from './components/Spinner';
import { rootReducer, State } from './reducers';

const Routes: VFC = () => {
  const history = useHistory();
  const isLoading = useSelector((state: State) => state.isLoading);
  console.log(isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(isLoading);
        history.push('/');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const mapStateFromProps = (state: State) => {
  return {
    isLoading: state.isLoading,
  };
};

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser })(Routes));
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
