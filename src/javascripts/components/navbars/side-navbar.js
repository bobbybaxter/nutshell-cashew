import $ from 'jquery';
import diary from '../diary/diary';
import messages from '../messages/messages';
import events from '../events/events';
import news from '../news/news';
import dashboard from '../dashboard/dashboard';


const hideAll = () => {
  $('#auth').addClass('hide');
  $('#userNameModalBtnDiv').addClass('hide');
  $('#homePageDiv').addClass('hide');
  $('#messagesPageDiv').addClass('hide');
  $('.authed-diary').addClass('hide');
  $('.authed-events').addClass('hide');
  $('.authed-news').addClass('hide');
};

const showEvents = () => {
  hideAll();
  events.initEvents();
  $('.authed-events').removeClass('hide');
};

const showDiary = () => {
  hideAll();
  diary.initDiary();
  $('.authed-diary').removeClass('hide');
};

const showNews = () => {
  hideAll();
  news.initNews();
  $('.authed-news').removeClass('hide');
};

const showMessages = () => {
  hideAll();
  messages.initMessages();
  $('#messagesPageDiv').removeClass('hide');
};

const showHome = () => {
  hideAll();
  dashboard.dashNews();
  $('#homePageDiv').removeClass('hide');
};

const showAuth = () => {
  hideAll();
  $('#auth').removeClass('hide');
};

const attachSideNavEvents = () => {
  $('#navbar-button-events').click(showEvents);
  $('#navbar-button-diary').click(showDiary);
  $('#navbar-button-news').click(showNews);
  $('#navbar-button-messages').click(showMessages);
  $('#navbar-button-home').click(showHome);
  $('#navbar-button-logout').click(showAuth);
};

export default { attachSideNavEvents };
