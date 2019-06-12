import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
import messagesData from '../../helpers/data/messages-data';
import smash from '../../helpers/smash';
import usersData from '../../helpers/data/users-data';
import util from '../../helpers/util';
import './messages.scss';

const submitMessage = (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    const messageInput = document.getElementById('addMessageInput');
    const messageTimeStamp = new Date();
    const currentUserId = firebase.auth().currentUser.uid;
    const newMessage = {
      uid: currentUserId,
      timeStamp: messageTimeStamp,
      message: messageInput.value,
    };
    messagesData.getMessagesArray()
      .then((messages) => {
        const matchingMessage = messages.find(m => m.uid === newMessage.uid && m.timeStamp === newMessage.timeStamp);
        if (matchingMessage) {
          console.error('message found');
        } else {
          messagesData.addMessage(newMessage)
            .then(() => {
              messageInput.value = '';
              initMessages(); // eslint-disable-line no-use-before-define
            })
            .catch();
        }
      })
      .catch();
  }
};

const addEvents = () => {
  document.getElementById('addMessageInput').addEventListener('keyup', submitMessage);
};

const messageViewBuilder = (arrayToPrint, currentUserId) => {
  let domString = '';
  arrayToPrint.forEach((message) => {
    const formattedTimeStamp = moment(message.timeStamp).format('MMMM D, YYYY h:mm A');
    domString += '<div class="row">';
    domString += '<div class="col-9">';
    domString += `<h4 class="w-100 text-center">${message.userName}</h4>`;
    domString += `<p class="col-3">${formattedTimeStamp}</p>`;
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
  document.getElementById('messagesPageDiv').classList.remove('hide');
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
  addEvents,
};
