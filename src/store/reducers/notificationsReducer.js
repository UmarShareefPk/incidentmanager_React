const initState = {
   notifications : []
   
   }
   
   const notificationsReducer = (state = initState, action) => {
     switch(action.type){
       case 'COMMENT_RECIEVED':    
       console.log(action);
       console.log(state.notifications);
       let nn = [...state.notifications, action.comment]      
         return {
           ...state,
           notifications : nn                 
         }     
        
       default:
         return state
     }
   };
   
   export default notificationsReducer;
                  