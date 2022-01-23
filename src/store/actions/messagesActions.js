import axios from 'axios';
import { messagesUrls } from "../../api/apiURLs";


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
             dispatch(messagesByConversations(conversationId));
             
              dispatch({ type: 'NEW_MESSAGE', data });
          })
          .catch((err)=>{  
            if (err.message.toLowerCase() == "request failed with status code 401")
              dispatch({ type: 'SIGN_OUT', data: "token invalid" });
            const data = err.message;
            console.log(data);
           
          });   
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
              dispatch({ type: 'NEW_MESSAGE', data });
          })
          .catch((err)=>{  
            if (err.message.toLowerCase() == "request failed with status code 401")
              dispatch({ type: 'SIGN_OUT', data: "token invalid" });
            const data = err.message;
            console.log(data);
           
          });   
    }
  }

 

