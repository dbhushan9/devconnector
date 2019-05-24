import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'
import {clearCurrentProfile} from './actions/profileAction';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

//CheckFor Token
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and is authenticated
  store.dispatch(setCurrentUser(decoded))

  //checl for expired token
  const currentTime = Date.now()/1000
  if (decoded.exp  < currentTime){
    store.dispatch(logoutUser); 
    //clear current profile
    store.dispatch(clearCurrentProfile);
    //redirect to login page
    window.location.href = '/login';
  }

}


function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/dashboard' component={Dashboard} />
            </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    
    
  );
}

export default App;
