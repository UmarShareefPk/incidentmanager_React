

const initState = {
    Incidents : [],
    TotalIncidents : 0,
    IncidentSelected : null
   }
   
   const incidentsReducer = (state = initState, action) => {
     switch(action.type){
       case 'INCIDENTS_WITH_PAGE':
        // console.log(action);
         return {
           ...state, 
           Incidents : action.data.Incidents,
           TotalIncidents : action.data.Total_Incidents            
         }     

         case 'INCIDENTS_BY_ID':
          // console.log(action);
           return {
             ...state, 
             IncidentSelected : action.data                       
           }     
         
       default:
         return state
     }
   };
   
   export default incidentsReducer;