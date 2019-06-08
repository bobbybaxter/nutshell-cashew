import firebase from 'firebase/app';

import auth from './components/auth/auth';

import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';
import navbar from './components/navbars/top-navbar';
import authData from './helpers/data/auth-data';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  authData.checkLoginStatus();
  navbar.navbarEvents();
};

init();
