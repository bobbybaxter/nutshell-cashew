// import util from '../../helpers/util';
import dashboardData from '../../helpers/data/dashboardData';

const dashboardBuilder = () => {
  dashboardData.getDashboardDataByUid()
    .then((dashboard) => {
      console.error(dashboard);
    });
};

export default { dashboardBuilder };
