import firebase from 'firebase/app';
import 'firebase/auth';

// import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const newsCardBuilder = (newsArticles) => {
  console.error(newsArticles);
};

const initNews = () => {
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsCardBuilder(newsArticles);
    })
    .catch(error => console.error(error));
};

export default { initNews };
