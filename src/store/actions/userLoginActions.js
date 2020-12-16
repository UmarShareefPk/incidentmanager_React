import axios from 'axios'
import qs from 'qs'

export const logIn = (credentials) => {
    return (dispatch, getState) => {
      

        axios({
            method: 'post',
            //url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
            url : "https://localhost:44398/token",
            headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            data: qs.stringify({
                grant_type: 'password',
                username: credentials.username,
                password: credentials.password 
            }),
          }).then((response)=>{              
              const loginData = {
                  token : response.data.access_token,
              }
              dispatch({ type: 'LOGIN_PASS', loginData });
          }).catch((err)=>{
                   dispatch({ type: 'LOGIN_FAIL'});
                   console.log(err);
          });
    
    }
  }
  
  export const signOut = () => {
    return (dispatch, getState) => {
      
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState) => {
     
    }
  }