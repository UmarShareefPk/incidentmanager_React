const initState = {
   Users : [],
   TotalUsers : 0
  }
  
  const usersReducer = (state = initState, action) => {
    switch(action.type){
      case 'USER_ADD':
        console.log(action);
        return {
          ...state,
          Users : [...state.users , action.user]     
        } 
        case 'ALL_USERS':        
          return {
            ...state,
            users : action.users    
          }      
        
        case 'USERS_WITH_PAGE':
          // console.log(action);
          return {
            ...state, 
            Users : action.data.Users,
            TotalUsers : action.data.Total_Users           
          }     
      default:
        return state
    }
  };
  
  export default usersReducer;