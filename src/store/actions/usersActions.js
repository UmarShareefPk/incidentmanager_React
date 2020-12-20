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