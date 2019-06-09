import axios from 'axios';
import fbref from '../apiKeys.json';

const firebaseUrl = fbref.firebaseKeys.databaseURL;

const getNewsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const newsResults = results.data;
      const news = [];
      Object.keys(newsResults).forEach((newsId) => {
        newsResults[newsId].id = newsId;
        newsId.push(newsResults[newsId]);
      });
      resolve(news);
    })
    .catch(error => reject(error));
});

export default { getNewsByUid };
