
const initState = {
    Messages : [],
    MessagesChanged:false,
    Conversations : [],  
    ConversationsChanged:false,
    UnreadConversations: 0,
    SelectedConversation: {},
    SelectedConversationChanged:false,
   }
 
   let changedMessages;
   let changedConversations;

   const messagesReducer = (state = initState, action) => {

     switch (action.type) {
       case "MESSAGES_BY_USER":
         //  console.log(action.data);
         return {
           ...state,
           Messages: action.data
         };
         
        case "CONVERSATION_SELECTED":
         //  console.log("CONVERSATION_SELECTED", action.data);
         return {
           ...state,
           SelectedConversation: action.data,
           SelectedConversationChanged : !state.SelectedConversationChanged,
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
           Conversations: action.data,
           ConversationsChanged: !state.ConversationsChanged,
         };

       case "MESSAGES_BY_CONVERSATIONS":
         //  console.log(action.data);
         return {
           ...state,
           Messages: action.data,
           MessagesChanged: !state.MessagesChanged,
         };
        
       case "NEW_MESSAGE":

         changedMessages = [...state.Messages];
         changedMessages.push(action.data);
         return {
           ...state,
           Messages: changedMessages,
           //   MessagesChanged: !state.MessagesChanged,
         };

       case "NEW_CONVERSATION":

         return {
           ...state,
           Conversations: [action.data, ...state.Conversations]
         };
       case "DELETE_MESSAGE":
         changedMessages = [...state.Messages];
         let mId = action.data;
         changedMessages = changedMessages.filter(m => m.Id != mId);

         return {
           ...state,
           Messages: changedMessages
         };

       case "CHANGE_MESSAGE_STATUS":
        
         changedMessages = [...state.Messages];
         changedMessages = changedMessages.map(m => {
           if (m.Id == action.data.messageId){            
             m.Status = action.data.status;
           }   
             return m;
         }
         );

         changedConversations = [...state.Conversations];
         changedConversations = changedConversations.map(c => {
           if (c.Id == state.SelectedConversation.Id){
            c.UnReadCount = c.UnReadCount - 1;
           }          
           return c;
         });
        
         return {
           ...state,
           Messages: changedMessages,
           Conversations: changedConversations
         };

       case "DELETE_CONVERSATION":
         console.log("deleteConversation reducer 1", action.data);
         changedConversations = [...state.Conversations];
         let cId = action.data;
         changedConversations = changedConversations.filter(c => c.Id != cId);

         return {
           ...state,
           Conversations: changedConversations,
           SelectedConversation: changedConversations[0],
           SelectedConversationChanged : !state.SelectedConversationChanged,
         };
  
       default:
         return state;
     }
   };
   
   export default messagesReducer;