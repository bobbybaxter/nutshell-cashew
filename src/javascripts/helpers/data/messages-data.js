import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMessagesArray = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json`)
    .then((results) => {
      const messagesObject = results.data;
      const messages = [];
      Object.keys(messagesObject).forEach((messageObjectId) => {
        messagesObject[messageObjectId].id = messageObjectId;
        messages.push(messagesObject[messageObjectId]);
      });
      console.error(messages, 'messages array inside getMessagesArray');
      resolve(messages);
    })
    .catch(error => reject(error));
});

export default {
  getMessagesArray,
};
