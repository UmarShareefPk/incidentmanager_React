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
                   const data = err.message;
                   console.log("error:", err);              
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
            const data = err.message;
            console.log(data);
           
          });   
    }
  }

 

