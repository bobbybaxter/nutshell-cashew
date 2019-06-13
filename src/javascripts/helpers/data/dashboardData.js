import firebase from 'firebase/app';
import 'firebase/auth';

import axios from 'axios';
import fbref from '../apiKeys.json';

// import newsData from './newsData';
import eventData from './events-data';
import diaryData from './diary-data';
import userData from './users-data';

const firebaseUrl = fbref.firebaseKeys.databaseURL;

const getDashboardTitles = () => new Promise((resolve, reject) => {
  axios.get('../../../database/base.json')
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

const dashUsers = () => new Promise((resolve, reject) => {
  const userNames = [];
  userData.getUsersArray()
    .then((users) => {
      users.forEach((user) => {
        userNames.push(user.userName);
      });
      resolve(userNames);
    })
    .catch(error => reject(error));
});

const dashEvents = () => new Promise((resolve, reject) => {
  const eventNames = [];
  const { uid } = firebase.auth().currentUser;
  eventData.getEventsByUid(uid)
    .then((events) => {
      events.forEach((event) => {
        eventNames.push(event.name);
      });
      resolve(eventNames);
    })
    .catch(error => reject(error));
});

const dashNews = () => new Promise((resolve, reject) => {
  let newsTitles = {};
  const { uid } = firebase.auth().currentUser;
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const newsArticles = results.data;
      console.error(newsArticles);
      for (let i = 0; i < newsArticles.length; i += 1) {
        newsTitles += newsArticles.i;
      }
      console.error('news titles', newsTitles);
      resolve(newsTitles);
    })
    .catch(error => reject(error));
});

const dashDiary = () => new Promise((resolve, reject) => {
  const diaryTitles = [];
  const { uid } = firebase.auth().currentUser;
  diaryData.getDiaryEntriesByUid(uid)
    .then((diaryEntries) => {
      diaryEntries.forEach((diaryEntry) => {
        diaryTitles.push(diaryEntry.title);
      });
      resolve(diaryTitles);
    })
    .catch(error => reject(error));
});

export default {
  getDashboardTitles, dashEvents, dashNews, dashDiary, dashUsers,
};
