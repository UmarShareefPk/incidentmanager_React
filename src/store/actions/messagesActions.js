import axios from 'axios';
import { messagesUrls } from "../../api/apiURLs";
import { sendMessageSignalR } from "../../signalR/sender";

export var cancel;

export const messagesByUser = (userId) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.messagesByUserUrl + userId;                   
        axios({
          method: 'GET',
          url: url,         
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
          .then((response)=>{ 
             const data = response.data;
              dispatch({ type: 'MESSAGES_BY_USER', data });
          })
          .catch((err)=>{    
                   console.log(err.message);
                   if (err.message.toLowerCase() == "request failed with status code 401")
                       dispatch({ type: 'SIGN_OUT', data: "token invalid" });
                   const data = err.message;
                   console.log("error:", err);              
          });    
    }
  } 

  export const conversationsByUser = (userId) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.conversationsByUserUrl + userId;                   
        axios({
          method: 'GET',
          url: url,         
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
          .then((response)=>{ 
             const data = response.data;
              dispatch({ type: 'CONVERSATIONS_BY_USER', data });
          })
          .catch((err)=>{    
                   console.log(err.message);
                   if (err.message.toLowerCase() == "request failed with status code 401")
                      dispatch({ type: 'SIGN_OUT', data: "token invalid" });
                   const data = err.message;
                   console.log("error:", err);              
          });    
    }
  } 

  export const messagesByConversations = (conversationId) => {
    
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.messagesByConversationsUrl + conversationId;                   
        axios({
          method: 'GET',
          url: url,         
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
          .then((response)=>{ 
             const data = response.data;
            // console.log("Messages Action", data);
              dispatch({ type: 'MESSAGES_BY_CONVERSATIONS', data });
          })
          .catch((err)=>{  
            if (err.message.toLowerCase() == "request failed with status code 401")
              dispatch({ type: 'SIGN_OUT', data: "token invalid" });  
                   console.log(err.message);
                   const data = err.message;
                   console.log("error:", err);              
          });    
    }
  } 

  export const replyMessage = (formData, conversationId) => {
    return (dispatch, getState) => {      
      //console.log("add new incident action");
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.sendMessageUrl
        axios.post(url, formData)
          .then((response)=>{            
             const data = true;           
             dispatch({ type: 'NEW_MESSAGE', data:response.data[0] });
           //  dispatch(messagesByConversations(conversationId));
             console.log("conversationId, response.data.To");
             sendMessageSignalR(conversationId, response.data[0].To, response.data[0], false);
             // dispatch({ type: 'NEW_MESSAGE', data });
          })
          .catch((err)=>{  
            if (err.message.toLowerCase() == "request failed with status code 401")
              dispatch({ type: 'SIGN_OUT', data: "token invalid" });
            const data = err.message;
            console.log(data);
           
          });   
    }
  }

  
  export const receiveMessage = (newMessage) => {
    return (dispatch, getState) => {      
     dispatch({ type: 'NEW_MESSAGE', data:newMessage });
    }
  }
  export const receiveConversation = (newConversation) => {
    console.log("newConversation", newConversation);
    return (dispatch, getState) => {      
     dispatch({ type: 'NEW_CONVERSATION', data:newConversation });
    }
  }

  export const selectConversation = (conversation) => {
    return (dispatch, getState) => {      
     dispatch({ type: 'CONVERSATION_SELECTED', data:conversation });
    }
  }

 
  export const sendNewMessage = (formData) => {
    return (dispatch, getState) => {      
      //console.log("add new incident action");
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.sendMessageUrl
        axios.post(url, formData)
          .then((response)=>{            
             const data = true;
             dispatch({ type: 'NEW_CONVERSATION', data:response.data[1] });
             sendMessageSignalR(null, response.data[1].User2, response.data[1], true);
          })
          .catch((err)=>{  
            if (err.message.toLowerCase() == "request failed with status code 401")
              dispatch({ type: 'SIGN_OUT', data: "token invalid" });
            const data = err.message;
            console.log(data);
           
          });   
    }
  }
 

  export const deleteMessage = (messageId) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = messagesUrls.deleteMessageUrl + messageId;                   
        axios({
          method: 'POST',
          url: url,         
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
          .then((response)=>{ 
             const data = response.data;
             console.log(data);
              dispatch({ type: 'DELETE_MESSAGE', data:messageId });
          })
          .catch((err)=>{    
                   console.log(err);
                   if (err.message.toLowerCase() == "request failed with status code 401")
                      dispatch({ type: 'SIGN_OUT', data: "token invalid" });
                   const data = err.message;
                   console.log("error:", err);              
          });    
    }
  } 
