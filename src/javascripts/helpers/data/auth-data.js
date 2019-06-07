import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../../components/diary/diary';

const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const authDiv = document.getElementById('auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      movieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
      diaryNav.classList.remove('hide');
      diaryNav.addEventListener('click', diary.initDiary);
    } else {
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
