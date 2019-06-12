import firebase from 'firebase/app';
import 'firebase/auth';

// import util from '../../helpers/util';
// import dashboardData from '../../helpers/data/dashboardData';

import newsData from '../../helpers/data/newsData';

// const dashboardBuilder = () => {
//   dashboardData.getDashboardDataByUid()
//     .then((dashboard) => {
//       console.error(dashboard);
//     });
// };

const dashboardBuilder = () => {
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((news) => {
      console.error(news);
    });
};

export default { dashboardBuilder };
