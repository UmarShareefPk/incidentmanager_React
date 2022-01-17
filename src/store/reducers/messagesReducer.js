
const initState = {
    Messages : [],
    Conversations : [],
    MessagesByConversations: []
   }
 
   
   const messagesReducer = (state = initState, action) => {
     switch (action.type) {
       case "MESSAGES_BY_USER":
         //  console.log(action.data);
         return {
           ...state,
           Messages: action.data
         };

       case "CONVERSATIONS_BY_USER":
         //  console.log(action.data);
         return {
           ...state,
           Conversations: action.data
         };

       case "MESSAGES_BY_CONVERSATIONS":
         //  console.log(action.data);
         return {
           ...state,
           Messages: action.data
         };

   
       default:
         return state;
     }
   };
   
   export default messagesReducer;