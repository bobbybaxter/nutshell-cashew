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
      resolve(messages);
    })
    .catch(error => reject(error));
});

const addMessage = messageObject => axios.post(`${firebaseUrl}/messages.json`, messageObject);

const editMessage = (messageId, messageObject) => axios.put(`${firebaseUrl}/messages/${messageId}.json`, messageObject);

const deleteMessage = messageId => axios.delete(`${firebaseUrl}/messages/${messageId}.json`);

export default {
  getMessagesArray,
  addMessage,
  editMessage,
  deleteMessage,
};
