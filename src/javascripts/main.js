import firebase from 'firebase/app';
import 'bootstrap';

import auth from './components/auth/auth';
import navbar from './components/navbars/top-navbar';
import authData from './helpers/data/auth-data';

import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  authData.checkLoginStatus();
  navbar.navbarEvents();
};

init();
