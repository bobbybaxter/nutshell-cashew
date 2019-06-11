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
  domString += '<div class="container">';
  domString += '<div class="row">';
  newsArticles.forEach((newsArticle) => {
    domString += '<div id="news-card" class="col-sm-12 col-md-6 col-lg-3">';
    domString += '<div class="card news-card">';
    domString += `<div id=${newsArticle.id}>`;
    domString += `<h5>${newsArticle.title}</h5>`;
    domString += `<div>${newsArticle.date}</div>`;
    domString += `<div>${newsArticle.synopsis}</div>`;
    domString += `<button id=${newsArticle.newsUrl} class="btn btn-warning news-article-link">View Article</button>`;
    domString += `<button id="delete.${newsArticle.id}" class="btn btn-danger delete-news-button">Delete Article</button>`;
    domString += `<button id="edit.${newsArticle.id}" type="button" class="btn btn-dark rounded-0 px-4 edit-article-button" data-dismiss="modal">Edit News Article</button>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('news-articles', domString);
  $('.news-article-link').click(newsCardEvents);
  $('.delete-news-button').click(deleteNews); // eslint-disable-line no-use-before-define
  $('.edit-article-button').click(editArticle); // eslint-disable-line no-use-before-define
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

const deleteNews = (e) => {
  const newsId = e.target.id.split('.')[1];
  newsData.deleteNews(newsId)
    .then(() => {
      initNews(); // eslint-disable-line no-use-before-define
    });
};

const editArticle = (e) => {
  const newsId = e.target.id.split('.')[1];
  const { uid } = firebase.auth().currentUser;
  $('#edit-article-form').modal('show');
  newsData.getNewsByUid(uid)
    .then((news) => {
      news.forEach((article) => {
        if (article.id === newsId) {
          document.getElementById('edit-title-input').value = article.title;
          document.getElementById('edit-date-input').value = article.date;
          document.getElementById('edit-synopsis-input').value = article.synopsis;
          document.getElementById('edit-url-input').value = article.newsUrl;
          document.getElementById('edit-url-input').parentNode.id = article.id;
        }
      });
    });
};

const saveNews = (e) => {
  const newsObject = {
    date: document.getElementById('edit-date-input').value,
    newsUrl: document.getElementById('edit-url-input').value,
    synopsis: document.getElementById('edit-synopsis-input').value,
    title: document.getElementById('edit-title-input').value,
    uid: firebase.auth().currentUser.uid,
  };
  const newsId = e.target.parentNode.previousElementSibling.id;
  newsData.editNewsArticle(newsId, newsObject)
    .then(() => {
      initNews(); // eslint-disable-line no-use-before-define
    });
};

const initNews = () => {
  document.getElementById('add-news-article').addEventListener('click', addNewArticle);
  document.getElementById('edit-news-article').addEventListener('click', saveNews);
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((newsArticles) => {
      newsCardBuilder(newsArticles);
    })
    .catch(error => console.error(error));
};

export default { initNews };
