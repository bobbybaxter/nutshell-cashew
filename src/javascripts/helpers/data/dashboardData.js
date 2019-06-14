import firebase from 'firebase/app';
import 'firebase/auth';

// import axios from 'axios';
// import fbref from '../apiKeys.json';

import newsData from './newsData';
import eventData from './events-data';
import diaryData from './diary-data';
import userData from './users-data';

const getTitles = () => {
  const dashTitles = ['Diary', 'Events', 'News', 'Users'];
  return dashTitles;
};

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
  const newsTitles = [];
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsArticles.forEach((newsArticle) => {
        newsTitles.push(newsArticle.title);
      });
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
  getTitles, dashEvents, dashNews, dashDiary, dashUsers,
};
