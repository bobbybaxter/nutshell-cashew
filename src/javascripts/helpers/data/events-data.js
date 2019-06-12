import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addEvent = newEvent => axios.post(`${firebaseUrl}/events.json`, newEvent);

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventsResults = results.data;
      const events = [];
      Object.keys(eventsResults).forEach((eventId) => {
        eventsResults[eventId].id = eventId;
        events.push(eventsResults[eventId]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});


export default { getEventsByUid, addEvent };
