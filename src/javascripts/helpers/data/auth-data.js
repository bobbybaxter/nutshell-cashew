import firebase from 'firebase/app';
import 'firebase/auth';
import diary from '../../components/diary/diary';
import usersData from './users-data';
import usersFunctions from '../../components/users/users';
import util from '../util';

const movieNavbar = document.getElementById('navbar-button-movie-history');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const authDiv = document.getElementById('auth');
const userNameOpenButton = document.getElementById('userNameModalOpen');
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
  movieNavbar.classList.remove('hide');
  authNavbar.classList.add('hide');
  logoutNavbar.classList.remove('hide');
  authDiv.classList.add('hide');
  userNameOpenButton.classList.add('hide');
  homePageDiv.classList.remove('hide');
  diaryNav.classList.remove('hide');
  diaryNav.addEventListener('click', diary.initDiary);
  printHomePage(userId);
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      usersData.getUsersArray()
        .then((users) => {
          const matchingUser = users.find(u => u.uid === user.uid);
          if (matchingUser) {
            loginHomeView(user);
          } else {
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
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      diaryNav.classList.add('hide');
      homePageDiv.classList.add('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
