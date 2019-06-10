import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';
import './news.scss';

const newsCardEvents = (e) => {
  window.location.href = e.target.id;
};

const newsCardBuilder = (newsArticles) => {
  let domString = '';
  newsArticles.forEach((newsArticle) => {
    domString += '<div id="news-card" class="col-sm-12 col-md-6 col-lg-3">';
    domString += '<div class="card news-card">';
    domString += `<div id=${newsArticle.id}>`;
    domString += `<h5>${newsArticle.title}</h5>`;
    domString += `<div>${newsArticle.date}</div>`;
    domString += `<div>${newsArticle.synopsis}</div>`;
    domString += `<button id=${newsArticle.newsUrl} class="btn btn-warning news-article-link">View Article</button>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('news-articles', domString);
  $('.news-article-link').click(newsCardEvents);
};

const initNews = () => {
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsCardBuilder(newsArticles);
    })
    .catch(error => console.error(error));
};

// onclick="window.location.href = '${newsArticle.newsUrl}'"

export default { initNews };
