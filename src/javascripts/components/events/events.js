import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import eventsData from '../../helpers/data/events-data';
import util from '../../helpers/util';

const addEvent = () => {
  const eventName = $('#event-name-input').val();
  const eventDate = $('#event-date-input').val();
  const eventLocation = $('#event-location-input').val();
  const newEvent = {
    name: eventName,
    date: eventDate,
    location: eventLocation,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.addEvent(newEvent)
    .then(() => {
      $('#event-name-input').val('');
      $('#event-date-input').val('');
      $('#event-location-input').val('');
      initEvents(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error(error));
};

const deleteEvent = (e) => {
  const eventId = e.target.id.split('.')[1];
  eventsData.deleteEvent(eventId)
    .then(() => initEvents()) // eslint-disable-line no-use-before-define
    .catch(err => console.error(err));
};

const editEvent = (e) => {
  const eventId = e.target.id.split('.')[1];
  const { uid } = firebase.auth().currentUser;
  $('#edit-event-form').modal('show');
  eventsData.getEventsByUid(uid)
    .then((events) => {
      events.forEach((event) => {
        if (event.id === eventId) {
          $('#edit-event-name').val(event.name);
          $('#edit-event-date').val(event.date);
          $('#edit-event-location').val(event.location);
          $('#edit-event-location').parent().attr('id', event.id);
        }
      });
    });
};

const saveEvent = (e) => {
  const eventId = $(e.target).parent().prev()[0].id;
  const eventName = $('#edit-event-name').val();
  const eventDate = $('#edit-event-date').val();
  const eventLocation = $('#edit-event-location').val();
  const updatedEvent = {
    name: eventName,
    date: eventDate,
    location: eventLocation,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.editEvent(eventId, updatedEvent)
    .then(() => initEvents()) // eslint-disable-line no-use-before-define
    .catch(err => console.error('event didnt update', err));
};

const eventListeners = () => {
  $('.eventDeleteBtn').on('click', deleteEvent);
  $('.eventEditBtn').on('click', editEvent);
};

const printEvents = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += '<div class="card eventCards d-flex flex-row align-items-center justify-content-between shadow-sm mb-2">';
    domString += '<table class="table table-borderless table-sm">';
    domString += '<tr>';
    domString += `<td class="p-0 event-name"><h2>${event.name}</h2></td>`;
    domString += `<td class="p-0 event-date font-weight-light px-2" rowspan="2">${event.date}</td>`;
    domString += '</tr>';
    domString += '<tr>';
    domString += `<td class="p-0 event-loc">${event.location}</td>`;
    domString += '</tr>';
    domString += '</table>';
    domString += '<div class="d-flex flex-row">';
    domString += `<button id="edit.${event.id}" class="btn btn-outline-dark eventEditBtn">Edit</button>`;
    domString += `<button id="delete.${event.id}" class="btn btn-outline-dark eventDeleteBtn">Delete</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('events', domString);
  eventListeners();
};

const initEvents = () => {
  $('#add-event').on('click', addEvent);
  $('#save-event').on('click', saveEvent);
  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then(events => printEvents(events))
    .catch(err => console.error(err));
};

export default { initEvents };
