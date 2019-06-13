import dashData from '../../helpers/data/dashboardData';

import util from '../../helpers/util';


const dashboardBuilder = (titles) => {
  let domString = '';
  domString += '<div class="container">';
  domString += '<div class="row">';
  titles.forEach((title) => {
    domString += '<div class="col-sm-12 col-md-6 col-lg-3">';
    domString += '<div class="card news-card">';
    domString += `<h5>${title}</h5>`;
    domString += `<div id=${title}></div>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('homePageDiv', domString);
};

const dashInit = () => {
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
