import axios from 'axios';

export const  allUsers = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};

        const url = "https://localhost:44398/api/users/AllUsers";
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
        const url = "https://localhost:44398/api/Users/GetUsersWithPage?"+
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
        const url = "https://localhost:44398/api/Users/AddUser"
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