import $ from 'jquery';
import diary from '../diary/diary';

const hideAll = () => {
  $('#auth').hide();
  $('#userNameModalDiv').hide();
  $('.authed-diary').hide();
};

const showDiary = () => {
  hideAll();
  diary.initDiary();
  $('.authed-diary').show();
};

const showHome = () => {
  hideAll();
  $('#userNameModalDiv').show();
};

const attachSideNavEvents = () => {
  $('#navbar-button-diary').click(showDiary);
  $('#navbar-button-home').click(showHome);
};

export default { attachSideNavEvents };
