// module contains multiple axios based functions for manipulating database collections. Exports functions for use in messages.js.
import axios from 'axios';
import apiKeys from '../apiKeys.json';
// URL for firebasee database
const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

/* function axios.gets messages collection from database.
Initializes empty array for holding final set of built objects.
Loops over keys in messages collection and assigns each key to be the id property of the currently iterated message object.
Pushes that object to the messages array.
Resolves array for use in application */

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

// function uses axios.post to add mess object to messages collection.

const addMessage = messageObject => axios.post(`${firebaseUrl}/messages.json`, messageObject);

// function uses axios.put to update a current message object in the message collection.

const editMessage = (messageId, messageObject) => axios.put(`${firebaseUrl}/messages/${messageId}.json`, messageObject);

// function uses axios.delete to remove message object from messages collection.

const deleteMessage = messageId => axios.delete(`${firebaseUrl}/messages/${messageId}.json`);

export default {
  getMessagesArray,
  addMessage,
  editMessage,
  deleteMessage,
};
