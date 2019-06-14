/* module loads page view based on whether user is logged in or not.
Function checkLoginStatus exported to be called in main.js */
import firebase from 'firebase/app';
import 'firebase/auth';

import sideNav from '../../components/navbars/side-navbar';
import usersData from './users-data';
import usersFunctions from '../../components/users/users';
import util from '../util';

// variables
const homeNavbar = document.getElementById('navbar-button-home');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const eventsNav = document.getElementById('navbar-button-events');
const newsNav = document.getElementById('navbar-button-news');
const authDiv = document.getElementById('auth');
const userNameOpenButton = document.getElementById('userNameModalBtnDiv');
const homePageDiv = document.getElementById('homePageDiv');
const messagesNavBar = document.getElementById('navbar-button-messages');
const messagesDiv = document.getElementById('messagesPageDiv');

// function prints view on page load after login and when Dashboard is clicked
const printHomePage = (userId) => {
  usersData.getUsersArray()
    .then((users) => {
      const matchingUser = users.find(u => u.uid === userId.uid);
      const domString = `<h1>Welcome, ${matchingUser.userName}</h1>`;
      util.printToDom('homePageDiv', domString);
    })
    .catch(error => console.error(error, 'could not get users array'));
};

/* function manages all hides and reveals for elements when user successfully authenticates and navigates to the home page.
Also calls print home page function above to load page content */
const loginHomeView = (userId) => {
  homeNavbar.classList.remove('hide');
  authNavbar.classList.add('hide');
  logoutNavbar.classList.remove('hide');
  authDiv.classList.add('hide');
  userNameOpenButton.classList.add('hide');
  homePageDiv.classList.remove('hide');
  diaryNav.classList.remove('hide');
  messagesNavBar.classList.remove('hide');
  eventsNav.classList.remove('hide');
  newsNav.classList.remove('hide');
  printHomePage(userId);
};

/* function checks if user is logged in. if so, checks if user's id is in database already.
If so, passes current user object from firebase into loginHomeView function call
If not, hides auth elements and adds function call to Save button in modal
in .then on that function call, calls loginHomeView with the current firebase user object passed in
If user is not logged in hides all elements except authentication and Google sign in button */

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
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
    } else {
      homeNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
      homePageDiv.classList.add('hide');
      eventsNav.classList.add('hide');
      newsNav.classList.add('hide');
      messagesNavBar.classList.add('hide');
      messagesDiv.classList.add('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
