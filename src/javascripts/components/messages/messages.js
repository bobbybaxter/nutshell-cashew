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
        const matchingMessage = messages.find(m => m.id === messageInput.dataset.value);
        if (matchingMessage) {
          newMessage.timeStamp = matchingMessage.timeStamp;
          messagesData.editMessage(messageInput.dataset.value, newMessage)
            .then(() => {
              messageInput.value = '';
              messageInput.dataset.value = '';
              initMessages(); // eslint-disable-line no-use-before-define
            })
            .catch(error => console.error(error, 'could not edit message'));
        } else {
          messagesData.addMessage(newMessage)
            .then(() => {
              messageInput.value = '';
              initMessages(); // eslint-disable-line no-use-before-define
            })
            .catch(error => console.error(error, 'could not add message'));
        }
      })
      .catch(error => console.error('could not get messages array in submitMessage', error));
  }
};

const addEvents = () => {
  document.getElementById('addMessageInput').addEventListener('keyup', submitMessage);
};

const repopulateMessageEdit = (e) => {
  messagesData.getMessagesArray()
    .then((messages) => {
      const messageId = e.target.id.split('$')[1];
      const messageEdit = document.getElementById('addMessageInput');
      messageEdit.dataset.value = messageId;
      const matchingMessage = messages.find(m => m.id === messageId);
      if (matchingMessage) {
        messageEdit.value = matchingMessage.message;
      }
    })
    .catch(error => console.error(error, 'could not get messages array in repopulateMessageEdit'));
};

const addButtonEvents = () => {
  const editButtons = Array.from(document.getElementsByClassName('edit-button'));
  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', repopulateMessageEdit);
  });
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
      domString += `<button id="edit$${message.id}" class="fas fa-pencil-alt edit-button" aria-label="Edit"></button>`;
      domString += `<button id="delete$${message.id}" class="fas fa-times delete-button" aria-label="Delete"></button>`;
      domString += '</div>';
    }
    domString += '</div>';
  });
  util.printToDom('messagesContainer', domString);
  addButtonEvents();
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
