import axios from 'axios';
import { dashboardUrls } from "../../api/apiURLs";

export const  GetKPI = (userId) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = dashboardUrls.kpiUrl + userId;
        console.log("url", url);
        axios.get(url)
          .then((response)=>{      
            console.log("reponse : ",  response);      
             const data = response.data;
            // console.log(data);
              dispatch({ type: 'KPI', data });
          })
          .catch((err)=>{                 
                   console.log(err);
          });
    
    }
  }

 

