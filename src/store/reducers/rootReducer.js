import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import userLoginReducer from './userLoginReducer';
import incidentsReducer from './incidentsReducer';
import notificationsReducer from './notificationsReducer';
import dashboardReducer from './dashboardReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    users: usersReducer,
    incidents: incidentsReducer,
    notifications : notificationsReducer,
    dashboard : dashboardReducer,
    messages: messagesReducer
  });
  
  export default rootReducer
  