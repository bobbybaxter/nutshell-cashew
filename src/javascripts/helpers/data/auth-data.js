import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../../components/diary/diary';
import events from '../../components/events/events';

const homeNavbar = document.getElementById('navbar-button-home');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const authDiv = document.getElementById('auth');
const eventsNav = document.getElementById('navbar-button-events');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
      diaryNav.classList.remove('hide');
      eventsNav.classList.remove('hide');
      diaryNav.addEventListener('click', diary.initDiary);
      eventsNav.addEventListener('click', events.initEvents);
    } else {
      homeNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
      eventsNav.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
