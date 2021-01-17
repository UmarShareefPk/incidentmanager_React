const initState = {
    user_Name : null,
    userId : null,
    loginError : false,
    token : null ,
    hubId : null  
   
   }
   
   const usersReducer = (state = initState, action) => {
     switch (action.type) {
       case "LOGIN_PASS":
         return {
           ...state,
           user_Name: action.loginData.Name,
           userId: action.loginData.User_Id,
           loginError: false,
           token: action.loginData.token,
         };
       case "LOGIN_FAIL":
         return {
           ...state,
           user_Name: null,
           userId: null,
           loginError: true,
           token: null,
         };

       case "UPDATE_HUB":
         return {
           ...state,
           hubId: action.hubId,
         };
       case "SIGN_OUT":
         return {
           ...state,
           user_Name : null,
           userId : null,
           loginError : false,
           token : null ,
           hubId : null  
          
         };
       default:
         return state;
     }
   };
   
   export default usersReducer;