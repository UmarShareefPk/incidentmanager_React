
const initState = {
   KPIData: {},
   OverallWidgetData : {},
   Last5IncidentsData : [],
   MostAssignedIncidentsData : {},
   Oldest5UnresolvedIncidentsData : [],
   }
  
   const dashboardReducer = (state = initState, action) => {
     switch (action.type) {
       case "KPI":
         // console.log(action);
         return {
           ...state,
           KPIData: action.data,
         };

       case "OVERALLWIDGET":
         // console.log(action);
         return {
           ...state,
           OverallWidgetData: action.data,
         };

       case "LAST5INCIDENTS":
         // console.log(action);
         return {
           ...state,
           Last5IncidentsData: action.data,
         };

       case "MOSTASSIGNEDTOUSERS":
         // console.log(action);
         return {
           ...state,
           MostAssignedIncidentsData: action.data,
         };

       case "OLDEST5UNRESOLVEDINCIDENTS":
         // console.log(action);
         return {
           ...state,
           Oldest5UnresolvedIncidentsData: action.data,
         };

       default:
         return state;
     }
   };
   
   export default dashboardReducer;