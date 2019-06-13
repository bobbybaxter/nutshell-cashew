import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import util from '../../helpers/util';
import diaryData from '../../helpers/data/diary-data';

import './diary.scss';

const addDiaryEntry = (event) => {
  const diaryId = event.target.value;

  const newEntry = {
    title: $('#diary-title-input').val(),
    date: $('#diary-date-input').val(),
    entryBody: $('#diary-entry-input').val(),
    uid: firebase.auth().currentUser.uid,
  };

  if (diaryId) {
    diaryData.editDiaryEntry(newEntry, diaryId)
      .then(() => {
        initDiary(); // eslint-disable-line no-use-before-define
      })
      .catch(error => console.error(error));
  } else {
    diaryData.addDiaryEntry(newEntry)
      .then(() => {
        initDiary(); // eslint-disable-line no-use-before-define
      })
      .catch(error => console.error(error));
  }
};

const prepareEditForm = (event) => {
  const entryId = event.target.dataset.value;
  $('#add-diary-entry').val(entryId);
  $('#diary-title-input').val($(`#${entryId}-title`).html());
  $('#diary-date-input').val($(`#${entryId}-date`).html());
  $('#diary-entry-input').val($(`#${entryId}-entry`).html());
};

const attachButtonEvents = () => {
  $('.edit').click(prepareEditForm);
};

const writeDiaryEntries = (diaryEntries) => {
  let domString = '';
  diaryEntries.forEach((diaryEntry) => {
    domString += `<div id="${diaryEntry.id}" class="media mb-5">`;
    domString += '  <div class="media-body">';
    domString += `    <h5 id="${diaryEntry.id}-title" class="mb-0">${diaryEntry.title}</h5>`;
    domString += `    <div id="${diaryEntry.id}-date">${diaryEntry.date}</div>`;
    domString += `    <div id="${diaryEntry.id}-entry" class="my-3">${diaryEntry.entryBody}</div>`;
    domString += '    <div class="d-flex justify-content-start">';
    domString += `      <button data-value="${diaryEntry.id}" class="edit btn btn-outline-dark mr-1" data-toggle="modal" data-target="#add-entry-form">Edit</button>`;
    domString += '      <button class="delete btn btn-outline-dark">Delete</button></div>';
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('diary-entries', domString);
  attachButtonEvents();
};

const clearForm = () => {
  $('#add-diary-entry').val('');
  $('#diary-title-input').val('');
  $('#diary-date-input').val('');
  $('#diary-entry-input').val('');
};

const initDiary = () => {
  document.getElementById('add-diary-entry').addEventListener('click', addDiaryEntry);
  $('#add-entry-form').on('hidden.bs.modal', clearForm);
  const { uid } = firebase.auth().currentUser;
  diaryData.getDiaryEntriesByUid(uid)
    .then((diaryEntries) => {
      writeDiaryEntries(diaryEntries);
    })
    .catch(error => console.error(error));
};

export default { initDiary };
