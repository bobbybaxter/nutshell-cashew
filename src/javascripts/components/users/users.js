import usersData from '../../helpers/data/users-data';
// import homePage from '../homePage/home-page';

const addUserName = userId => new Promise((resolve, reject) => {
  const userNameInput = document.getElementById('userNameInput');
  let createdUserName = '';
  if (userNameInput === '') {
    createdUserName = 'anonymousUser';
  } else {
    createdUserName = userNameInput.value;
  }
  const newUser = {
    uid: userId.uid,
    userName: createdUserName,
  };
  usersData.addNewUser(newUser)
    .then(() => {
      userNameInput.value = '';
      resolve(newUser);
    })
    .catch(error => reject(error));
});

export default {
  addUserName,
};
