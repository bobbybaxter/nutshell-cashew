import firebase from 'firebase/app';
import 'firebase/auth';

<<<<<<< HEAD
import diary from '../../components/diary/diary';
import events from '../../components/events/events';
=======
import sideNav from '../../components/navbars/side-navbar';
import usersData from './users-data';
import usersFunctions from '../../components/users/users';
import util from '../util';
>>>>>>> master

const homeNavbar = document.getElementById('navbar-button-home');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const authDiv = document.getElementById('auth');
<<<<<<< HEAD
const eventsNav = document.getElementById('navbar-button-events');
=======
const userNameOpenButton = document.getElementById('userNameModalBtnDiv');
const homePageDiv = document.getElementById('homePageDiv');

const printHomePage = (userId) => {
  usersData.getUsersArray()
    .then((users) => {
      const matchingUser = users.find(u => u.uid === userId.uid);
      const domString = `<h1>Welcome, ${matchingUser.userName}</h1>`;
      util.printToDom('homePageDiv', domString);
    })
    .catch(error => console.error(error, 'could not get users array'));
};

const loginHomeView = (userId) => {
  homeNavbar.classList.remove('hide');
  authNavbar.classList.add('hide');
  logoutNavbar.classList.remove('hide');
  authDiv.classList.add('hide');
  userNameOpenButton.classList.add('hide');
  homePageDiv.classList.remove('hide');
  diaryNav.classList.remove('hide');
  printHomePage(userId);
};
>>>>>>> master

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
<<<<<<< HEAD
      homeNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
      diaryNav.classList.remove('hide');
      eventsNav.classList.remove('hide');
      diaryNav.addEventListener('click', diary.initDiary);
      eventsNav.addEventListener('click', events.initEvents);
=======
      sideNav.attachSideNavEvents();
      usersData.getUsersArray()
        .then((users) => {
          const matchingUser = users.find(u => u.uid === user.uid);
          if (matchingUser) {
            loginHomeView(user);
          } else {
            authDiv.classList.add('hide');
            authNavbar.classList.add('hide');
            userNameOpenButton.classList.remove('hide');
            document.getElementById('saveUserNameBtn').addEventListener('click', () => {
              usersFunctions.addUserName(user)
                .then(loginHomeView)
                .catch(error => console.error(error, 'could not add user'));
            });
          }
        })
        .catch(error => console.error('could not get users array', error));
>>>>>>> master
    } else {
      homeNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
<<<<<<< HEAD
      eventsNav.classList.add('hide');
=======
      homePageDiv.classList.add('hide');
      diaryNav.classList.add('hide');
>>>>>>> master
    }
  });
};

export default { checkLoginStatus };
