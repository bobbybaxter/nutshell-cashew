// module exports single function for getting the users collection in an array format
import axios from 'axios';
import apiKeys from '../apiKeys.json';
// URL for database in firebase
const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

/* function calls axios.get to extract users collection from database.
Initializes empty array to hold built user objects.
Loops over the keys in the users collection, sets each key to be the id of the currently iterated object, and pushes built objects to array
Resolves final array for use in application */

const getUsersArray = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json`)
    .then((results) => {
      const usersObject = results.data;
      const users = [];
      Object.keys(usersObject).forEach((userObjectId) => {
        usersObject[userObjectId].id = userObjectId;
        users.push(usersObject[userObjectId]);
      });
      resolve(users);
    })
    .catch(error => reject(error));
});

const addNewUser = userObject => axios.post(`${firebaseUrl}/users.json`, userObject);

export default {
  getUsersArray,
  addNewUser,
};
