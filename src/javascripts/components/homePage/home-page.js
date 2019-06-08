// import util from '../../helpers/util';
// import usersData from '../../helpers/data/users-data';


// const movieNavbar = document.getElementById('navbar-button-movie-history');
// const authNavbar = document.getElementById('navbar-button-auth');
// const logoutNavbar = document.getElementById('navbar-button-logout');
// const authDiv = document.getElementById('auth');
// const userNameOpenButton = document.getElementById('userNameModalOpen');
// const homePageDiv = document.getElementById('homePageDiv');

// const printHomePage = (userId) => {
//   usersData.getUsersArray()
//     .then((users) => {
//       const matchingUser = users.find(u => u.uid === userId);
//       const domString = `<h1>Welcome, ${matchingUser.userName}</h1>`;
//       util.printToDom('homePageDiv', domString);
//     })
//     .catch(error => console.error(error, 'could not get users array'));
// };

// const loginHomeView = (userId) => {
//   movieNavbar.classList.remove('hide');
//   authNavbar.classList.add('hide');
//   logoutNavbar.classList.remove('hide');
//   authDiv.classList.add('hide');
//   userNameOpenButton.classList.add('hide');
//   homePageDiv.classList.remove('hide');
//   printHomePage(userId);
// };

// export default {
//   printHomePage,
//   loginHomeView,
// };
