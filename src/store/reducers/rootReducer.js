import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import userLoginReducer from './userLoginReducer';
import incidentsReducer from './incidentsReducer';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    users: usersReducer,
    incidents: incidentsReducer
   
  });
  
  export default rootReducer
  