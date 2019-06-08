import firebase from 'firebase/app';
import 'firebase/auth';
import messagesData from '../../helpers/data/messages-data';
import usersData from '../../helpers/data/users-data';

const initMessages = () => {
  const currentUser = firebase.auth().currentUser.uid;
  messagesData.getMessagesArray()
    .then((messages) => {
      usersData.getUsersArray()
        .then((users) => {
          const matchingUser = users.find(u => u.uid === currentUser);
          console.error('current user object in array', matchingUser);
          console.error(messages, 'got messages array in init');
        })
        .catch();
    })
    .catch(error => console.error(error, 'could not get messages array in initMessages'));
};

export default {
  initMessages,
};
