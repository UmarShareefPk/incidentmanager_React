//import userLogin from '../../models/UserLogin';

const initState = {
    userLogin : null,
    loginError : false,
    token : null
   }
   
   const usersReducer = (state = initState, action) => {
     switch(action.type){
       case 'LOGIN_PASS':
         console.log(action);
         return {
           ...state, 
           userLogin : "hehehehe",
           loginError : false,
            token : action.loginData.token              
         }     
         case 'LOGIN_FAIL':
            console.log(action);          
            return {
              ...state, 
              userLogin : null,
              loginError : true,
               token : null  
            }     
       default:
         return state
     }
   };
   
   export default usersReducer;