import axios from 'axios';
import { usersUrls } from "../../api/apiURLs";

export const  commentRecieved = (comment) => {
    return (dispatch, getState) => {  
     
      dispatch({ type: 'COMMENT_RECIEVED', comment });
        // axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        // const url = usersUrls.allUsersUrl
        // axios.get(url)
        //   .then((response)=>{            
        //      const users = response.data;
           
        //   })
        //   .catch((err)=>{                 
        //            console.log(err);
        //   });
    
    }
  }

  export const  getAllNotifications = (userId) => {
    return (dispatch, getState) => {  
     
      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.allNotificationsUrl + "?userId=" + userId;
        axios.get(url)
          .then((response)=>{            
             const notifications = response.data;
             dispatch({ type: 'GET_ALL_NOTIFICATIONS', data : notifications });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }



 