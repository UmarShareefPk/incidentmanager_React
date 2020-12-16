//import userLogin from '../../models/UserLogin';

const initState = {
    userLogin : null,
    isLoggedIn : false,
    token : null
   }
   
   const usersReducer = (state = initState, action) => {
     switch(action.type){
       case 'LOGIN_PASS':
         console.log(action);
         return {
           ...state, 
           userLogin : "hehehehe",
            isLoggedIn : true,
            token : "Test token"      
         }     
   
       default:
         return state
     }
   };
   
   export default usersReducer;