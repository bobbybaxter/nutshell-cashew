import firebase from 'firebase/app';
import 'firebase/auth';

import dashData from '../../helpers/data/dashboardData';
import eventData from '../../helpers/data/events-data';

import util from '../../helpers/util';


const dashboardBuilder = (titles) => {
  let domString = '';
  domString += '<div class="container">';
  domString += '<div class="row">';
  titles.forEach((title) => {
    domString += '<div class="col-sm-12 col-md-6 col-lg-3">';
    domString += '<div class="card news-card">';
    domString += `<h3>${title}</h3>`;
    domString += `<div id=${title}></div>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('homePageDiv', domString);
};

const arrayTest = () => {
  const { uid } = firebase.auth().currentUser;
  const eventsArray = eventData.getEventsByUid(uid);
  console.error(eventsArray.data);
};

const dashInit = () => {
  arrayTest();
  dashData.getDashboardTitles()
    .then((dashboardTitles) => {
      dashboardBuilder(dashboardTitles);
      dashData.dashNews()
        .then((newsTitles) => {
          let domString = '';
          newsTitles.forEach((newsTitle) => {
            domString += `<p>${newsTitle}</p>`;
          });
          util.printToDom('news', domString);
        });
      dashData.dashEvents()
        .then((eventNames) => {
          let domString = '';
          eventNames.forEach((eventName) => {
            domString += `<p>${eventName}</p>`;
          });
          util.printToDom('events', domString);
        });
      dashData.dashDiary()
        .then((diaryTitles) => {
          let domString = '';
          diaryTitles.forEach((diaryTitle) => {
            domString += `<p>${diaryTitle}</p>`;
          });
          util.printToDom('diaryEntries', domString);
        });
      dashData.dashUsers()
        .then((userNames) => {
          let domString = '';
          userNames.forEach((userName) => {
            domString += `<p>${userName}</p>`;
          });
          util.printToDom('users', domString);
        });
    });
};

export default { dashInit };
