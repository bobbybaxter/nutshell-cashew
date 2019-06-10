import firebase from 'firebase/app';
import 'firebase/auth';
import messagesData from '../../helpers/data/messages-data';
import smash from '../../helpers/smash';
import usersData from '../../helpers/data/users-data';
import util from '../../helpers/util';

const messageViewBuilder = (arrayToPrint, currentUserId) => {
  let domString = '';
  arrayToPrint.forEach((message) => {
    domString += '<div class="row">';
    domString += '<div class="col-9">';
    domString += `<h4 class="w-100 text-center">${message.userName}</h4>`;
    domString += `<p class="col-3">${message.timeStamp}</p>`;
    domString += `<p class="col-6">${message.message}</p>`;
    domString += '</div>';
    if (message.uid === currentUserId) {
      domString += '<div class="col-3">';
      domString += '<button class="edit-button">Edit</button>';
      domString += '<button class="delete-button">Delete</button>';
      domString += '</div>';
    }
    domString += '</div>';
  });
  util.printToDom('messagesContainer', domString);
};

const initMessages = () => {
  const currentUser = firebase.auth().currentUser.uid;
  messagesData.getMessagesArray()
    .then((messages) => {
      usersData.getUsersArray()
        .then((users) => {
          const finalMessages = smash.buildMessagesArray(users, messages);
          messageViewBuilder(finalMessages, currentUser);
        })
        .catch();
    })
    .catch(error => console.error(error, 'could not get messages array in initMessages'));
};

export default {
  initMessages,
};
