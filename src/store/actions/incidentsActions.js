import axios from 'axios';


export const incidentsWithPage = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/GetIncidentsWithPage?"+
                    "PageSize=" + parameters.PageSize +"&PageNumber=" + parameters.PageNumber 
                    + "&SortBy=q&SortDirection=q&Search=" + parameters.Search;
        axios.get(url)
          .then((response)=>{            
             const data = response.data;
              dispatch({ type: 'INCIDENTS_WITH_PAGE', data });
          })
          .catch((err)=>{                 
                   console.log(err);
          });    
    }
  }

  export const addNewIncident = (formData) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/AddIncident"
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