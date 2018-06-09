import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCard, clearCards } from './actions/cardActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import MakeCard from './components/make-card/MakeCard';
import Display from './components/display-card/Display';

import './App.css';

// Check for token (for refresh page)
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for token expired
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Clear Card & Cards
    store.dispatch(clearCard());
    store.dispatch(clearCards());
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Route path="/">
              <Switch>
                <Route path="/makecard" exact />
                <Route path="/card" />
                <Route path="/"   component={ Navbar } />
              </Switch>
            </Route>

            <div id="main">
              <Switch>
                <PrivateRoute path="/dashboard"   component={ Dashboard }     exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/makecard"    component={ MakeCard }      exact />
              </Switch>
              <Route path="/register"     component={ Register }      exact />
              <Route path="/login"        component={ Login }         exact />
              <Route path="/card/:handle" component={ Display }       exact />              
              <Route path="/"             component={ Landing }       exact />
            </div>

            <Route path="/">
              <Switch>
                <Route path="/makecard" exact />
                <Route path="/card" />
                <Route path="/"   component={ Footer } />
              </Switch>
            </Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
