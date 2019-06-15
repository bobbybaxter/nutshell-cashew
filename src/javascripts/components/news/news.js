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
  domString += '<div class="container">';
  domString += '<div class="row justify-content-around">';
  newsArticles.forEach((newsArticle) => {
    domString += '<div id="news-card" class="p-0 m-2 card col-sm-12 col-md-5 shadow-sm">';
    domString += '<div class="d-flex flex-column p-3 card-body news-card">';
    domString += `<div id=${newsArticle.id} class="h-100">`;
    domString += `<h4 class="card-title">${newsArticle.title}</h4>`;
    domString += `<div class="card-subtitle font-weight-light border-bottom mb-1">${newsArticle.date}</div>`;
    domString += '<div id="summary" class="mb-2">';
    domString += `<p class="collapse" id="collapse_${newsArticle.id}">${newsArticle.synopsis}</p>`;
    domString += `<a class="collapsed" data-toggle="collapse" href="#collapse_${newsArticle.id}" aria-expanded="false" aria-controls="collapse_${newsArticle.id}"></a>`;
    domString += '</div>';
    domString += '</div>';
    domString += '<div>';
    domString += `<button id=${newsArticle.newsUrl} class="btn-outline-dark news-article-link fas fa-external-link-alt"></button>`;
    domString += `<button id="edit.${newsArticle.id}" type="button" class="btn-outline-dark edit-article-button fas fa-pencil-alt mx-3" aria-label="Edit" data-dismiss="modal"></button>`;
    domString += `<button id="delete.${newsArticle.id}" class="btn-outline-dark delete-news-button fas fa-times" aria-label="Delete"></button>`;
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
      document.getElementById('article-date-input').value = '';
      document.getElementById('article-url-input').value = '';
      document.getElementById('article-synopsis-input').value = '';
      document.getElementById('article-title-input').value = '';
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
