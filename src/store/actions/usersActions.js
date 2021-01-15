import axios from 'axios';
import { usersUrls } from "../../api/apiURLs";

export const  allUsers = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.allUsersUrl
        axios.get(url)
          .then((response)=>{            
             const users = response.data;
              dispatch({ type: 'ALL_USERS', users });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }

  export const userssWithPage = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.userssWithPageUrl +
                    "PageSize=" + parameters.PageSize +"&PageNumber=" + parameters.PageNumber 
                    + "&SortBy=q&SortDirection=q&Search=" + parameters.Search;
        axios.get(url)
          .then((response)=>{            
             const data = response.data;                   
              dispatch({ type: 'USERS_WITH_PAGE', data });
          })
          .catch((err)=>{                 
                   console.log(err);
          });    
    }
  }

  export const addNewUser = (formData) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = usersUrls.addNewUserUrl 
        axios.post(url, formData)
          .then((response)=>{            
             const data = response.data;
            //  dispatch({ type: 'INCIDENTS_WITH_PAGE', data });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }

