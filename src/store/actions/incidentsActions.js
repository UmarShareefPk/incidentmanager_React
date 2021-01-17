import axios from 'axios';
import { incidentsUrls } from "../../api/apiURLs";
import { incidentUpdatedSignalR } from "../../signalR/sender";

export var cancel;

export const incidentsWithPage = (parameters) => {
    return (dispatch, getState) => {  
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.incidentsWithPageUrl +
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
                   console.log(err.message);
                   const data = err.message;
                   dispatch({ type: 'INCIDENTS_WITH_PAGE_ERROR', data });
          });    
    }
  }

  export const addNewIncident = (formData) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.addNewIncidentUrl
        axios.post(url, formData)
          .then((response)=>{            
             const data = true;
              dispatch({ type: 'NEW_INCIDENT_STATUS', data });
          })
          .catch((err)=>{  
            const data = err.message;
            dispatch({ type: 'NEW_INCIDENT_ERROR', data });
          });   
    }
  }

  export const addNewComment = (formData) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.addNewCommentUrl
        axios.post(url, formData)
          .then((response)=>{            
             const comment = response.data;
            // console.log("Comment", comment);
              dispatch({ type: 'ADD_NEW_COMMENT', data: comment });
              incidentUpdatedSignalR(comment.IncidentId);
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while adding comment: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }

  export const deleteComment = (commentId, incidentId, userId) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.deleteCommentUrl
                    + "commentId=" + commentId
                    + "&incidentId=" + incidentId
                    + "&userId=" + userId
        axios.get(url)
          .then((response)=>{    
              dispatch({ type: 'COMMENT_DELETED', data: commentId });
              incidentUpdatedSignalR(incidentId);
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while delteing comment: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }

  export const updateIncident = (parameters) => {
    return (dispatch, getState) => {      
     // console.log(comment);
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.updateIncidentUrl
        axios.post(url, parameters)
          .then((response)=>{  
              dispatch({ type: 'INCIDENTS_UPDATE', parameters });
              incidentUpdatedSignalR(parameters.IncidentId);
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while updating incident: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }

  export const updateComment = (comment) => {
    return (dispatch, getState) => {    
       console.log(comment);
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.updateCommentUrl
        axios.post(url, comment)
          .then((response)=>{  
          //  dispatch(getIncidentById(comment.IncidentId)); 
          incidentUpdatedSignalR(comment.IncidentId);
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while updating comment: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }


  export const getIncidentById = (incidentId) => {
    return (dispatch, getState) => {  
    //  console.log("getIncidentById" ); 
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.getIncidentByIdUrl + incidentId; 
        axios.get(url)
          .then((response)=>{            
             const data = response.data;                     
              dispatch({ type: 'INCIDENTS_BY_ID', data });
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while getting data for incident: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }

  export const deleteAttachment = (type, userid, incidentId , file) => {
    return (dispatch, getState) => {    
     
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.deleteAttachmentUrl
                + "type=" + type
                + "&commentId=" + file.CommentId 
                + "&incidentId=" + incidentId
                + "&userId=" + userid
                + "&fileId=" + file.Id
                + "&filename=" + file.FileName
                + "&contentType=" + file.ContentType
        axios.get(url)
          .then((response)=>{      
                if (type === "comment")
                  dispatch({ type: "COMMENT_ATTACHMENT_DELETED", data: file });
                else
                dispatch({ type: "INCIDENT_ATTACHMENT_DELETED", data: file });
          })
          .catch((err)=>{                 
            console.log(err.message);
            const data = "while delteing attachment: " + err.message;
            dispatch({ type: 'INCIDENTS_BY_ID_ERROR', data });
          });   
    }
  }

  export const removeIncidentData = () => {       
         return   { type: 'REMOVE_INCIDENT_DATA', data : null};
         
  }

