const initState = {
   users : []
  }
  
  const usersReducer = (state = initState, action) => {
    switch(action.type){
      case 'USER_ADD':
        console.log(action);
        return {
          ...state,       
        } 
     
  
      default:
        return state
    }
  };
  
  export default usersReducer;