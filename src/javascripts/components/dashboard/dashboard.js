import firebase from 'firebase/app';
import 'firebase/auth';

import axios from 'axios';
import util from '../../helpers/util';
// import news from '../news/news';
import newsData from '../../helpers/data/newsData';
import eventData from '../../helpers/data/events-data';

const getDashboardTitles = () => new Promise((resolve, reject) => {
  axios.get('../../database/base.json')
    .then((results) => {
      const dashboardTitlesJson = Object.keys(results.data);
      const dashboardTitles = [];
      for (let i = 0; i < dashboardTitlesJson.length; i += 1) {
        dashboardTitles.push(dashboardTitlesJson[i]);
      }
      resolve(dashboardTitles);
    })
    .catch(error => reject(error));
});

const dashboardBuilder = (titles) => {
  getDashboardTitles()
    .then((dashboardTitles) => {
      let domString = '';
      let domString2 = '';
      domString += '<div class="container">';
      domString += '<div class="row">';
      for (let i = 0; i < dashboardTitles.length; i += 1) {
        domString += '<div class="col-sm-12 col-md-6 col-lg-3">';
        domString += '<div class="card news-card">';
        domString += `<h5>${dashboardTitles[i]}</h5>`;
        domString += `<div id=${dashboardTitles[i]}></div>`;
        domString += '</div>';
        domString += '</div>';
      }
      titles.forEach((title) => {
        domString2 += `<p>${title}</p>`;
      });
      domString += '</div>';
      domString += '</div>';
      util.printToDom('homePageDiv', domString);
      util.printToDom(titles, domString2);
    });
};

const dashEvents = () => {
  const events = [];
  const { uid } = firebase.auth().currentUser;
  eventData.getEventsByUid(uid)
    .then((eventList) => {
      eventList.forEach((event) => {
        events.push(event.name);
      });
      dashboardBuilder(events);
    });
};

const dashNews = () => {
  const news = [];
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsArticles.forEach((newsArticle) => {
        news.push(newsArticle.title);
      });
      dashboardBuilder(news);
      dashEvents();
    });
};

export default { dashNews };
