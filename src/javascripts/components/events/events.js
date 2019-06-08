import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../../helpers/data/events-data';
import util from '../../helpers/util';

const printEvents = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += '<div class="card eventCards d-flex flex-row align-items-center justify-content-between shadow-sm mb-2">';
    domString += '<table class="table table-borderless table-sm">';
    domString += '<tr>';
    domString += `<td class="p-0 event-name"><strong>${event.name}</strong></td>`;
    domString += `<td class="p-0 event-date font-weight-light px-2" rowspan="2">${event.date}</td>`;
    domString += '</tr>';
    domString += '<tr>';
    domString += `<td class="p-0 event-loc">${event.location}</td>`;
    domString += '</tr>';
    domString += '</table>';
    domString += '<div class="d-flex flex-row">';
    domString += '<button class="btn btn-outline-dark eventEditBtn">Edit</button>';
    domString += '<button class="btn btn-outline-dark eventDeleteBtn">Delete</button>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('events', domString);
};

const initEvents = () => {
  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then(events => printEvents(events))
    .catch(err => console.error(err));
};

export default { initEvents };
