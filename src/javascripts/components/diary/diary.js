import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import util from '../../helpers/util';
import diaryData from '../../helpers/data/diary-data';

import './diary.scss';

const addDiaryEntry = () => {
  const newEntry = {
    title: $('#diary-title-input').val(),
    date: $('#diary-date-input').val(),
    entryBody: $('#diary-entry-input').val(),
    uid: firebase.auth().currentUser.uid,
  };
  diaryData.addDiaryEntry(newEntry)
    .then(() => {
      initDiary(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error(error));
};

const writeDiaryEntries = (diaryEntries) => {
  let domString = '';
  diaryEntries.forEach((diaryEntry) => {
    domString += `<div id=${diaryEntry.id} class="media mb-5">`;
    domString += '  <div class="media-body">';
    domString += `    <h5 class="mb-0">${diaryEntry.title}</h5>`;
    domString += `    <div>${diaryEntry.date}</div>`;
    domString += `    <div class="my-3">${diaryEntry.entryBody}</div>`;
    domString += '    <div class="d-flex justify-content-start"><button class="btn btn-outline-dark mr-1">Edit</button><button class="btn btn-outline-dark">Delete</button></div>';
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('diary-entries', domString);
};

const initDiary = () => {
  $('#add-diary-entry').click(addDiaryEntry);
  const { uid } = firebase.auth().currentUser;
  diaryData.getDiaryEntriesByUid(uid)
    .then((diaryEntries) => {
      writeDiaryEntries(diaryEntries);
    })
    .catch(error => console.error(error));
};

export default { initDiary };
