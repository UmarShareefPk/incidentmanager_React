import axios from 'axios';
import { incidentsUrls } from "../../api/apiURLs";

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
                   console.log(err);
          });    
    }
  }

  export const addNewIncident = (formData) => {
    return (dispatch, getState) => {      
        axios.defaults.headers = {'Authorization': `Bearer ${getState().userLogin.token + ""}`};
        const url = incidentsUrls.addNewIncidentUrl
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
        const url = incidentsUrls.addNewCommentUrl
        axios.post(url, formData)
          .then((response)=>{            
             const comment = response.data;
            // console.log("Comment", comment);
              dispatch({ type: 'ADD_NEW_COMMENT', data: comment });
          })
          .catch((err)=>{                 
                   console.log(err);
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
          })
          .catch((err)=>{                 
                   console.log(err);
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
          })
          .catch((err)=>{                 
                   console.log(err);
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
        const url = incidentsUrls.getIncidentByIdUrl + incidentId; 
        axios.get(url)
          .then((response)=>{            
             const data = response.data;                     
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

