
const initState = {
    Incidents : [],
    TotalIncidents : 0,
    IncidentsError : "", // if API error in Incident Listing
    IncidentDetailError : "", // if API error in Incident Detail
    AddNewIncidentError: "",   
    AddNewIncidentStatus: false,   // true if new incident has been addedd
    IncidentSelected : null
   }
   let changedincident = null;
   
   const incidentsReducer = (state = initState, action) => {
     switch (action.type) {
       case "INCIDENTS_WITH_PAGE":
         // console.log(action);
         return {
           ...state,
           Incidents: action.data.Incidents,
           TotalIncidents: action.data.Total_Incidents,
           IncidentsError: "",
         };

       case "INCIDENTS_WITH_PAGE_ERROR":
         return {
           ...state,
           IncidentsError: action.data,
         };

       case "NEW_INCIDENT_ERROR":
         return {
           ...state,
           AddNewIncidentError: action.data,
         };
       case "NEW_INCIDENT_STATUS":
         return {
           ...state,
           AddNewIncidentError: "",
           AddNewIncidentStatus: action.data,
         };

       case "INCIDENTS_BY_ID":
         return {
           ...state,
           IncidentDetailError: "",
           IncidentSelected: action.data,
         };
       case "INCIDENTS_BY_ID_ERROR":
         return {
           ...state,
           IncidentDetailError: action.data,
         };

       case "REMOVE_INCIDENT_DATA":
         return {
           ...state,
           IncidentSelected: null,
         };

       case "COMMENT_ATTACHMENT_DELETED":
         changedincident = { ...state.IncidentSelected };
         let attachments = changedincident.Comments.find(
           (c) => c.Id === action.data.CommentId
         ).attachments.filter((file) => file.Id !== action.data.Id);

         changedincident.Comments = changedincident.Comments.map((c) => {
           if (c.Id === action.data.CommentId) c.attachments = attachments;
           return c;
         });
         return {
           ...state,
           IncidentSelected: changedincident,
         };

       case "INCIDENT_ATTACHMENT_DELETED":
         changedincident = { ...state.IncidentSelected };
         changedincident.Attachments = changedincident.Attachments.filter(
           (file) => file.Id !== action.data.Id
         );

         return {
           ...state,
           IncidentSelected: changedincident,
         };

       case "INCIDENTS_UPDATE":
         changedincident = { ...state.IncidentSelected };
         switch (action.parameters.Parameter.toLowerCase()) {
           case "status":
             changedincident.Status = action.parameters.Value;
             break;
           case "assignedto":
             changedincident.AssignedTo = action.parameters.Value;
             break;
           case "title":
             changedincident.Title = action.parameters.Value;
             break;
           case "description":
             changedincident.Description = action.parameters.Value;
             break;
           case "additionaldata":
             changedincident.AdditionalData = action.parameters.Value;
             break;
           case "starttime":
             changedincident.StartTime = action.parameters.Value;
             break;
           case "duedate":
             changedincident.DueDate = action.parameters.Value;
             break;

           default:
         }
         return {
           ...state,
           IncidentSelected: changedincident,
         };

       case "ADD_NEW_COMMENT":
         changedincident = { ...state.IncidentSelected };
         changedincident.Comments = [action.data].concat(
           changedincident.Comments
         );
         return {
           ...state,
           IncidentSelected: changedincident,
         };

       case "COMMENT_DELETED":
         changedincident = { ...state.IncidentSelected };
         changedincident.Comments = changedincident.Comments.filter(
           (comment) => comment.Id !== action.data
         );
         return {
           ...state,
           IncidentSelected: changedincident,
         };

       case "SIGN_OUT":
         return {
           ...state,
           Incidents: [],
           TotalIncidents: 0,
           IncidentsError: "",
           AddNewIncidentError: "",
           AddNewIncidentStatus: false, // true if new incident has been addedd
           IncidentSelected: null,
         };

       default:
         return state;
     }
   };
   
   export default incidentsReducer;