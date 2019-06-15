// import firebase from 'firebase/app';
import 'firebase/auth';

import dashData from '../../helpers/data/dashboardData';
// import eventData from '../../helpers/data/events-data';

import util from '../../helpers/util';


const dashboardBuilder = (titles) => {
  let domString = '';
  domString += '<div class="container">';
  domString += '<div class="row">';
  titles.forEach((title) => {
    domString += '<div class="p-0 m-2 card dash-card shadow-sm">';
    domString += '<div class="d-flex flex-column p-3 card-body news-card">';
    domString += `<h3 class="card-header border">${title}</h3>`;
    domString += `<div id=${title} class="card-body comment-widgets py-1 px-0"></div>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('homePageDiv', domString);
};

const dashInit = () => {
  dashboardBuilder(dashData.getTitles());
  dashData.dashNews()
    .then((newsTitles) => {
      let domString = '';
      newsTitles.forEach((newsTitle) => {
        domString += `<p class="comment-row justify-content-center p-0">${newsTitle}</p>`;
      });
      util.printToDom('News', domString);
    });
  dashData.dashEvents()
    .then((eventNames) => {
      let domString = '';
      eventNames.forEach((eventName) => {
        domString += `<p class="comment-row justify-content-center p-0">${eventName}</p>`;
      });
      util.printToDom('Events', domString);
    });
  dashData.dashDiary()
    .then((diaryTitles) => {
      let domString = '';
      diaryTitles.forEach((diaryTitle) => {
        domString += `<p class="comment-row justify-content-center p-0">${diaryTitle}</p>`;
      });
      util.printToDom('Diary', domString);
    });
  dashData.dashUsers()
    .then((userNames) => {
      let domString = '';
      userNames.forEach((userName) => {
        domString += `<p class="comment-row justify-content-center p-0">${userName}</p>`;
      });
      util.printToDom('Users', domString);
    });
};

export default { dashInit };
