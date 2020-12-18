

const initState = {
    Incidents : [],
    TotalIncidents : 0
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
         
       default:
         return state
     }
   };
   
   export default incidentsReducer;