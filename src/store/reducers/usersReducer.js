const initState = {
   users : []
  }
  
  const usersReducer = (state = initState, action) => {
    switch(action.type){
      case 'USER_ADD':
        console.log(action);
        return {
          ...state,
          users : [...state.users , action.user]     
        } 
        case 'ALL_USERS':        
          return {
            ...state,
            users : action.users    
          }      
  
      default:
        return state
    }
  };
  
  export default usersReducer;