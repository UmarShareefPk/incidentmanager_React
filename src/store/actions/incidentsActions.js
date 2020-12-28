import axios from 'axios';

export var cancel;

export const incidentsWithPage = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/GetIncidentsWithPage?"+
                    "PageSize=" + parameters.PageSize +"&PageNumber=" + parameters.PageNumber 
                    + "&SortBy=q&SortDirection=q&Search=" + parameters.Search;
        //axios.get(url)
        axios({
          method: 'GET',
          url: url,
          //params: { q: query, page: pageNumber },
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
          .then((response)=>{     
            console.log(parameters.Search)  ;     
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

  export const getIncidentById = (incidentId) => {
    return (dispatch, getState) => {  
    //  console.log("getIncidentById" ); 
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/IncidentById?Id=" + incidentId; 
        axios.get(url)
          .then((response)=>{            
             const data = response.data;  
            // console.log("data" , data);           
              dispatch({ type: 'INCIDENTS_BY_ID', data });
          })
          .catch((err)=>{                 
                   console.log("By Id",err);
          });
    
    }
  }