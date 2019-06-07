import firebase from 'firebase/app';
import 'firebase/auth';

const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const authDiv = document.getElementById('auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      movieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
    } else {
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
    }
  });
};

export default { checkLoginStatus };
