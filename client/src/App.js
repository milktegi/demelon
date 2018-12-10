import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import './App.css';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/edit-profile/EditProfile';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  // check for expired  token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // todo : clear profile
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
