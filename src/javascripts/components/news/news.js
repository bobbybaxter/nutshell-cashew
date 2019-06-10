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
  console.error(newsArticles);
  let domString = '';
  domString += '<div class="container">'; // cards no longer appearing off screen
  domString += '<div class="row">';
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
  domString += '</div>';
  domString += '</div>';
  util.printToDom('news-articles', domString);
  $('.news-article-link').click(newsCardEvents);
};

const addNewArticle = () => {
  const newsObject = {
    date: document.getElementById('article-date-input').value,
    newsUrl: document.getElementById('article-url-input').value,
    synopsis: document.getElementById('article-synopsis-input').value,
    title: document.getElementById('article-title-input').value,
    uid: firebase.auth().currentUser.uid,
  };
  newsData.addNews(newsObject)
    .then(() => {
      initNews(); // eslint-disable-line no-use-before-define
    });
};

const initNews = () => {
  $('#add-news-article').click(addNewArticle);
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsCardBuilder(newsArticles);
    })
    .catch(error => console.error(error));
};

export default { initNews };
