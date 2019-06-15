import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
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

const deleteMessage = (e) => {
  const messageId = e.target.id.split('$')[1];
  messagesData.deleteMessage(messageId)
    .then(() => {
      initMessages(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error('could not delete message', error));
};

const addButtonEvents = () => {
  const editButtons = Array.from(document.getElementsByClassName('edit-button'));
  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', repopulateMessageEdit);
  });
  const deleteButtons = Array.from(document.getElementsByClassName('delete-button'));
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteMessage);
  });
};

// this made our scrollbox work in the chatbox project, but i can't see to get it to scroll here
const scrollPosition = () => {
  const container = $('#messagesContainer')[0];
  const containerHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;
  container.scrollTop = contentHeight - containerHeight;
};

const messageViewBuilder = (arrayToPrint, currentUserId) => {
  let domString = '';
  arrayToPrint.forEach((message) => {
    const formattedTimeStamp = moment(message.timeStamp).format('MMMM D, YYYY h:mm A');
    if (message.uid !== currentUserId) {
      domString += '<div class="message-block d-flex flex-column align-items-start mr-2">';
      domString += '<div class="w-100 d-flex flex-row messageRow">';
      domString += `<h3 class="m-0 message-name">${message.userName}</h3>`;
      domString += `<p class="my-0 mr-0 ml-2 message-date font-weight-light text-muted">${formattedTimeStamp}</p>`;
      domString += '</div>';
      domString += `<p class="messageContent messageBubbleIn">${message.message}</p>`;
      domString += '</div>';
    } else {
      domString += '<div class="message-block d-flex flex-column align-items-end ml-2">';
      domString += `<p class="message-info">${formattedTimeStamp}</p>`;
      domString += '<div class="d-flex flex-row messageRow">';
      domString += `<p class="messageContent messageBubbleOut">${message.message}</p>`;
      domString += '<div class="d-flex flex-row">';
      domString += `<button id="edit$${message.id}" class="btn-outline-dark fas fa-pencil-alt edit-button" aria-label="Edit"></button>`;
      domString += `<button id="delete$${message.id}" class="btn-outline-dark fas fa-times delete-button" aria-label="Delete"></button>`;
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
    }
  });
  util.printToDom('messagesContainer', domString);
  addButtonEvents();
  scrollPosition();
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
