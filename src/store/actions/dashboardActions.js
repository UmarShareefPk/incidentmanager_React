import axios from 'axios';
import { dashboardUrls } from "../../api/apiURLs";

export const  GetKPI = (userId) => {
    return (dispatch, getState) => {  
             axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.kpiUrl + userId;       
        axios.get(url)
          .then((response)=>{      
          
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'KPI', data });
          })
          .catch((err)=>{      
            if (err.message.toLowerCase() == "request failed with status code 401")
                   dispatch({ type: 'SIGN_OUT', data: "token invalid" });           
                   console.log(err);
          });
    
    }
  }

  export const  GetOverallWidget = () => {
    return (dispatch, getState) => {  
             axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.overallWidgetUrl ;      
        axios.get(url)
          .then((response)=>{      
                
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'OVERALLWIDGET', data });
          })
          .catch((err)=>{     
            if (err.message.toLowerCase() == "request failed with status code 401")
             dispatch({ type: 'SIGN_OUT', data: "token invalid" });            
                   console.log(err);
          });    
    }
  }

  export const  GetLast5Incidents = () => {
    return (dispatch, getState) => {  
             axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.last5IncidentsUrl ;      
        axios.get(url)
          .then((response)=>{      
          
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'LAST5INCIDENTS', data });
          })
          .catch((err)=>{     
            if (err.message.toLowerCase() == "request failed with status code 401")
               dispatch({ type: 'SIGN_OUT', data: "token invalid" });            
                   console.log(err);
          });    
    }
  }
 

  export const  GetOldest5UnresolvedIncidents = () => {
    return (dispatch, getState) => {  
             axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.oldest5UnresolvedIncidentsUrl ;      
        axios.get(url)
          .then((response)=>{      
           
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'OLDEST5UNRESOLVEDINCIDENTS', data });
          })
          .catch((err)=>{        
            if (err.message.toLowerCase() == "request failed with status code 401")
               dispatch({ type: 'SIGN_OUT', data: "token invalid" });         
                   console.log(err);
          });    
    }
  }
 
  export const  GetMostAssignedToUsers = () => {
    return (dispatch, getState) => {  
             axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.mostAssignedToUsersIncidentsUrl ;      
        axios.get(url)
          .then((response)=>{      
                 
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'MOSTASSIGNEDTOUSERS', data });
          })
          .catch((err)=>{    
            if (err.message.toLowerCase() == "request failed with status code 401")
                dispatch({ type: 'SIGN_OUT', data: "token invalid" });             
                   console.log(err);
          });    
    }
  }
