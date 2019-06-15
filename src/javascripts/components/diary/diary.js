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

const deleteDiaryEntry = (event) => {
  const entryId = event.target.dataset.value;
  diaryData.deleteDiaryEntry(entryId)
    .then(() => {
      initDiary(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error(error));
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
  $('.delete').click(deleteDiaryEntry);
};

const writeDiaryEntries = (diaryEntries) => {
  let domString = '';
  diaryEntries.forEach((diaryEntry) => {
    domString += `<div id="${diaryEntry.id}" class="media card mb-4 shadow-sm">`;
    domString += '  <div class="media-body card-body">';
    domString += `    <h4 id="${diaryEntry.id}-title" class="card-title">${diaryEntry.title}</h4>`;
    domString += `    <div id="${diaryEntry.id}-date" class="card-subtitle border-bottom font-weight-light">${diaryEntry.date}</div>`;
    domString += `    <div id="${diaryEntry.id}-entry" class="my-3">${diaryEntry.entryBody}</div>`;
    domString += '    <div class="d-flex justify-content-end">';
    domString += `      <button data-value="${diaryEntry.id}" class="edit btn-outline-dark fas fa-pencil-alt mr-1" aria-label="Edit" data-toggle="modal" data-target="#add-entry-form"></button>`;
    domString += `      <button data-value="${diaryEntry.id}" class="delete btn-outline-dark fas fa-times" aria-label="Delete"></button></div>`;
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
