import firebase from 'firebase/app';
import 'firebase/auth';

import sideNav from '../../components/navbars/side-navbar';

const homeNavbar = document.getElementById('navbar-button-home');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const authDiv = document.getElementById('auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
      diaryNav.classList.remove('hide');
      sideNav.attachSideNavEvents();
    } else {
      homeNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
