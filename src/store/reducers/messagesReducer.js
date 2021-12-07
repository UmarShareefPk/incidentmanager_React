
const initState = {
    Messages : []
   }
   let changedincident = null;
   
   const messagesReducer = (state = initState, action) => {
     switch (action.type) {
       case "MESSAGES_BY_USER":
        //  console.log(action.data);
         return {
           ...state,
           Messages : action.data
         };

   
       default:
         return state;
     }
   };
   
   export default messagesReducer;