import axios from 'axios';
import fbref from '../apiKeys.json';

const firebaseUrl = fbref.firebaseKeys.databaseURL;

const getDashboardDataByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}`)
    .then((results) => {
      const dashboardResults = results.data;
      const dashboard = [];
      Object.keys(dashboardResults).forEach((dashboardId) => {
        dashboardResults[dashboardId].id = dashboardId;
        dashboard.push(dashboardResults[dashboardId]);
      });
      resolve(dashboard);
    })
    .catch(error => reject(error));
});

export default { getDashboardDataByUid };
