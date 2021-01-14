const initState = {
    user_Name : null,
    userId : null,
    loginError : false,
    token : null   
   
   }
   
   const usersReducer = (state = initState, action) => {
     switch(action.type){
       case 'LOGIN_PASS':    
         return {
           ...state, 
           user_Name : action.loginData.Name,
           userId : action.loginData.User_Id,
           loginError : false,
            token : action.loginData.token              
         }     
         case 'LOGIN_FAIL':                    
            return {
              ...state, 
              user_Name : null,
              userId :null,
              loginError : true,
               token : null  
            }     
       default:
         return state
     }
   };
   
   export default usersReducer;