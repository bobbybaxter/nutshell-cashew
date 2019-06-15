/* module exports single function which maps over messages array,
Finds the user object whose uid matches the uid on the currently iterated message,
And assigns that user's user name to be a value of the userName property created on the currently iterated message.
New array contains all built messages */
const buildMessagesArray = (usersArray, messagesArray) => messagesArray.map((message) => {
  const builtMessage = message;
  const matchingUser = usersArray.find(u => u.uid === message.uid);
  builtMessage.userName = matchingUser.userName;
  return builtMessage;
});

export default {
  buildMessagesArray,
};
