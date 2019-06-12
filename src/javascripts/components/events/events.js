import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import eventsData from '../../helpers/data/events-data';
import util from '../../helpers/util';

const addEvent = () => {
  const newEvent = {
    name: $('#event-name-input').val(),
    date: $('#event-date-input').val(),
    location: $('#event-location-input').val(),
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
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => initEvents()) // eslint-disable-line no-use-before-define
    .catch(err => console.error(err));
};

const editEvent = (e) => {
  const eventId = e.target.id;
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
  const updatedEvent = {
    name: $('#edit-event-name').val(),
    date: $('#edit-event-date').val(),
    location: $('#edit-event-location').val(),
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.editEvent(eventId, updatedEvent)
    .then(() => initEvents()) // eslint-disable-line no-use-before-define
    .catch(err => console.error('event didnt update', err));
};

const eventListeners = () => {
  $('.eventDeleteBtn').on('click', deleteEvent);
  $('.eventEditBtn').on('click', editEvent);
  $('#add-event').off('click', addEvent).on('click', addEvent);
  $('#save-event').off('click', saveEvent).on('click', saveEvent);
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
    domString += `<button id="${event.id}" class="btn btn-outline-dark eventEditBtn">Edit</button>`;
    domString += `<button id="${event.id}" class="btn btn-outline-dark eventDeleteBtn">Delete</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('events', domString);
  eventListeners();
};

const initEvents = () => {
  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then(events => printEvents(events))
    .catch(err => console.error(err));
};

export default { initEvents };
