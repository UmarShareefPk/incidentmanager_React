import axios from 'axios';
import qs from 'qs';

export const incidentsWithPage = (parameters) => {
    return (dispatch, getState) => {    
        const url = "https://localhost:44398/api/Incidents/GetIncidentsWithPage?"+
                    "PageSize=" + parameters.PageSize +"&PageNumber=" + parameters.PageNumber + "&SortBy=q&SortDirection=q";
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