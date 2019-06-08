import $ from 'jquery';
import diary from '../diary/diary';

const hideAll = () => {
  // add your div here and hide it
};

const showDiary = () => {
  hideAll();
  diary.initDiary();
  $('.authed-diary').show();
};

const attachSideNavEvents = () => {
  $('#navbar-button-diary').click(showDiary);
};

export default { attachSideNavEvents };
