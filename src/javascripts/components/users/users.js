// module contains and exports function to be called when Save button in user name modal is clicked.
import usersData from '../../helpers/data/users-data';

/* function tests whether user input's value is an empty string.
If so, sets user name to stock name.
If not, sets it to value of user name input.
Creates new user object and passes it into an add function from users-data.js.
After adding object to firebase, clears value of input */

const addUserName = (userId) => {
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
    })
    .catch(error => console.error('could not add user', error));
};

export default {
  addUserName,
};
