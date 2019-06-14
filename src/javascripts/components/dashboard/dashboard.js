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

const dashInit = () => {
  dashboardBuilder(dashData.getTitles());
  dashData.dashNews()
    .then((newsTitles) => {
      let domString = '';
      newsTitles.forEach((newsTitle) => {
        domString += `<p>${newsTitle}</p>`;
      });
      util.printToDom('News', domString);
    });
  dashData.dashEvents()
    .then((eventNames) => {
      let domString = '';
      eventNames.forEach((eventName) => {
        domString += `<p>${eventName}</p>`;
      });
      util.printToDom('Events', domString);
    });
  dashData.dashDiary()
    .then((diaryTitles) => {
      let domString = '';
      diaryTitles.forEach((diaryTitle) => {
        domString += `<p>${diaryTitle}</p>`;
      });
      util.printToDom('Diary', domString);
    });
  dashData.dashUsers()
    .then((userNames) => {
      let domString = '';
      userNames.forEach((userName) => {
        domString += `<p>${userName}</p>`;
      });
      util.printToDom('Users', domString);
    });
};

export default { dashInit };
