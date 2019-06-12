import axios from 'axios';

const getDashboardTitles = () => new Promise((resolve, reject) => {
  axios.get('../../database/base.json')
    .then((results) => {
      const dashboardTitlesJson = Object(results.data);
      console.error(dashboardTitlesJson);
      const dashboardTitles = [];
      for (let i = 0; i < dashboardTitlesJson.length; i += 1) {
        dashboardTitles.push(dashboardTitlesJson.i);
        console.error('dashboard for loop', dashboardTitlesJson[i]);
      }
      // dashboardTitlesJson.forEach((dashboardTitle) => {
      //   dashboardTitles.push(dashboardTitle);
      // });
      resolve(dashboardTitles);
    })
    .catch(error => reject(error));
});


const dashboardBuilder = () => {
  getDashboardTitles()
    .then((dashboardTitles) => {
      console.error(dashboardTitles);
    });
};

export default { dashboardBuilder };
