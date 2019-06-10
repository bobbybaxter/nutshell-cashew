import firebase from 'firebase/app';
import 'firebase/auth';
import messagesData from '../../helpers/data/messages-data';
import smash from '../../helpers/smash';
import usersData from '../../helpers/data/users-data';
import util from '../../helpers/util';
import './messages.scss';

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
      domString += '<button class="fas fa-pencil-alt edit-button" aria-label="Edit"></button>';
      domString += '<button class="fas fa-times delete-button" aria-label="Delete"></button>';
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
          const builtMessages = smash.buildMessagesArray(users, messages);
          const finalMessages = builtMessages.sort((a, b) => Date.parse(a.timeStamp) - Date.parse(b.timeStamp));
          messageViewBuilder(finalMessages, currentUser);
        })
        .catch();
    })
    .catch(error => console.error(error, 'could not get messages array in initMessages'));
};

export default {
  initMessages,
};
