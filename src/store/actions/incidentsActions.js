import axios from 'axios';

export var cancel;

export const incidentsWithPage = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/GetIncidentsWithPage?"+
                    "PageSize=" + parameters.PageSize +"&PageNumber=" + parameters.PageNumber 
                    + "&SortBy=q&SortDirection=q&Search=" + parameters.Search;     
        axios({
          method: 'GET',
          url: url,         
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
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

  export const addNewComment = (formData) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/AddComment"
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

  export const updateIncident = (parameters) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/UpdateIncident"
        axios.post(url, parameters)
          .then((response)=>{  
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

  export const deleteAttachment = (type, userid, incidentId , file) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = "https://localhost:44398/api/Incidents/DeleteFile?"
                + "type=" + type
                + "&commentId=" + file.CommentId 
                + "&incidentId=" + incidentId
                + "&userId=" + userid
                + "&fileId=" + file.Id
                + "&filename=" + file.FileName
                + "&contentType=" + file.ContentType
        axios.get(url)
          .then((response)=>{            
             const data = response.data;  
           
          })
          .catch((err)=>{                 
                   console.log("By Id",err);
          });   
    }
  }

  export const removeIncidentData = () => {       
         return   { type: 'REMOVE_INCIDENT_DATA', data : null};
         
  }

