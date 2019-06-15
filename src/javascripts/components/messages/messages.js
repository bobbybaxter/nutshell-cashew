/* module handles functionality for messages, including full CRUD.
Exports addEvents and InitMessages.
addEvents is called on page load in main.js, and initMessages is called in sideNav module. */
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import moment from 'moment';
import messagesData from '../../helpers/data/messages-data';
import smash from '../../helpers/smash';
import usersData from '../../helpers/data/users-data';
import util from '../../helpers/util';
import './messages.scss';

/* function handles actions for when Enter is hit in message edit at bottom of page.
When Enter is hit, a new object is built with the current new Date, th ecurrent firebase user id, and the value currently int he message edit.
Get messages from messages-data is then called.
A conditional tests for whether one of the messages from the collection has an id which matches the dataset.value of the message edit.
If so, the timestamp is updated to be the matching message's timestamp, and an edit message function from messages-data is called
with the updated new message object and the editing message's id passed in.
The page is then reprinted and the message edit's value emptied.
If not, the new message object is added to the messages collectiona nd the edit is cleared and the page is reprinted. */

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

// function adds event listener on keyup to message edit

const addEvents = () => {
  document.getElementById('addMessageInput').addEventListener('keyup', submitMessage);
};

/* function repopulates message edit at bottom of page with the message text selected for editing.
Calls get messages function from messages-data.
assigns editing message's id to dataset.value of message edit.
Uses find to locate message object in messages array whose id matches the extracted id and places that message's text in the message edit. */

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

/* message calls axios delete function from messages-data and passes in messageId extracted from the button clicked.
After DEFAULT_ENCODING, reprints page using initMessages */

const deleteMessage = (e) => {
  const messageId = e.target.id.split('$')[1];
  messagesData.deleteMessage(messageId)
    .then(() => {
      initMessages(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error('could not delete message', error));
};

// function loops over edit and delete buttons (separately) and attaches event listeners to each button.

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
// function auto-scrolls user to last message
const scrollPosition = () => {
  const container = $('#messagesContainer')[0];
  const containerHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;
  container.scrollTop = contentHeight - containerHeight;
};

/* function prints page and calls button event listeners.
Builds domString which changes slightly based on whether the iterated message has a user id that matches the current firebase user's id.
If so, adds edit and delete buttons.
Otherwise, in all cases prints user name, timestamp,a nd message body.
Uses momentjs to format time stamps.
Prints to page and calls button event listener function. */
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

/* function initiates functionality when Messages navbar button is clicked.
Calls get functions for messages and users arrays.
Feeds resulting arrays into smash function which produces final array
Sorts array by timeStamp parsed to date format.
Passes sorted array into messageViewBuilder function call along with the current user's id.
Thereby prints page and kicks off event listeners for buttons. */

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
        .catch(error => console.error('could not get users array in initMessages', error));
    })
    .catch(error => console.error(error, 'could not get messages array in initMessages'));
};

export default {
  initMessages,
  addEvents,
};
