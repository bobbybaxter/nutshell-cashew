import $ from 'jquery';
import diary from '../diary/diary';

const hideAll = () => {
  $('#auth').addClass('hide');
  $('#userNameModalDiv').addClass('hide');
  $('.authed-diary').addClass('hide');
};

const showDiary = () => {
  hideAll();
  diary.initDiary();
  $('.authed-diary').removeClass('hide');
};

const showHome = () => {
  hideAll();
  $('#userNameModalDiv').removeClass('hide');
};

const showAuth = () => {
  hideAll();
  $('#auth').removeClass('hide');
};

const attachSideNavEvents = () => {
  $('#navbar-button-diary').click(showDiary);
  $('#navbar-button-home').click(showHome);
  $('#navbar-button-logout').click(showAuth);
};

export default { attachSideNavEvents };
