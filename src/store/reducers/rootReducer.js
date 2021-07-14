import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import userLoginReducer from './userLoginReducer';
import incidentsReducer from './incidentsReducer';
import notificationsReducer from './notificationsReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    users: usersReducer,
    incidents: incidentsReducer,
    notifications : notificationsReducer,
    dashboard : dashboardReducer
  });
  
  export default rootReducer
  