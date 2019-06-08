import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

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
