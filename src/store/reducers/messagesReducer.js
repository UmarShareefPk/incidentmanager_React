
const initState = {
    Messages : [],
    Conversations : [],  
    UnreadConversations: 0,
    SelectedConversation: {},
   }
 
   let changedMessages;

   const messagesReducer = (state = initState, action) => {

     switch (action.type) {
       case "MESSAGES_BY_USER":
         //  console.log(action.data);
         return {
           ...state,
           Messages: action.data
         };
         
        case "CONVERSATION_SELECTED":
         //  console.log(action.data);
         return {
           ...state,
           SelectedConversation: action.data
         };
        case "UNREAD_CONVERSATION":
        //  console.log(action.data);
        return {
          ...state,
          UnreadConversations: action.data
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
        
        case "NEW_MESSAGE":
        
        changedMessages = [ ...state.Messages ];
        changedMessages.push(action.data);
        return {
          ...state,
          Messages: changedMessages
        };

        case "NEW_CONVERSATION":
          console.log("new con in reducer", action.data);
          return {
            ...state,
            Conversations: [action.data, ...state.Conversations]
          };
       case "DELETE_MESSAGE":
        changedMessages = [ ...state.Messages ];
        let mId = action.data;
        changedMessages = changedMessages.filter(m => m.Id != mId);
    
         return {
           ...state,
           Messages: changedMessages
         };
  
       default:
         return state;
     }
   };
   
   export default messagesReducer;