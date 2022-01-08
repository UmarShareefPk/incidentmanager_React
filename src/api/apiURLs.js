//const baseUrl = "https://localhost:44398/";
//https://192.168.100.178:44310/
//export const baseUrl = "http://im/IMCore/";
export const baseUrl = "https://localhost:44310/";
//export const baseUrl = "http://localhost/ImWebapiCore/";

export const usersUrls = {
    tokenUrl : baseUrl + "token",
    authenticateUrl :  baseUrl + "api/Users/authenticate",
    allUsersUrl : baseUrl + "api/users/AllUsers",
    userssWithPageUrl : baseUrl + "api/Users/GetUsersWithPage?",
    addNewUserUrl : baseUrl + "api/Users/AddUser",
    updateHubIdUrl : baseUrl + "api/Users/UpdateHubId",
    allNotificationsUrl :  baseUrl + "api/Users/UserNotifications",
    setNotificationStatusUrl : baseUrl + "api/Users/UpdateIsRead"
}

export const incidentsUrls = {
    incidentsWithPageUrl : baseUrl + "api/Incidents/GetIncidentsWithPage?",
    addNewIncidentUrl : baseUrl + "api/Incidents/AddIncident",
    addNewCommentUrl : baseUrl + "api/Incidents/AddComment",
    deleteCommentUrl : baseUrl + "api/Incidents/DeleteComment?",
    updateIncidentUrl : baseUrl + "api/Incidents/UpdateIncident",
    updateCommentUrl : baseUrl + "api/Incidents/UpdateComment",    
    getIncidentByIdUrl : baseUrl + "api/Incidents/IncidentById?Id=",
    deleteAttachmentUrl : baseUrl + "api/Incidents/DeleteFile?",
    downloadFileUrl : baseUrl + "api/Incidents/DownloadFile?",
}

export const dashboardUrls = {
    kpiUrl : baseUrl + "api/Incidents/KPI?userId=",
    overallWidgetUrl : baseUrl + "api/Incidents/OverallWidget",
    last5IncidentsUrl : baseUrl + "api/Incidents/Last5Incidents",
    oldest5UnresolvedIncidentsUrl : baseUrl + "api/Incidents/Oldest5UnresolvedIncidents?",
    mostAssignedToUsersIncidentsUrl : baseUrl + "api/Incidents/MostAssignedToUsersIncidents",
}

export const messagesUrls = {
   messagesByUserUrl : baseUrl + "api/Messages/MessagesByUser?UserId=",
   sendMessageUrl :  baseUrl + "api/Messages/AddMessage",
   conversationsByUserUrl :  baseUrl + "api/Messages/ConversationsByUser?UserId=",
   messagesByConversationsUrl :  baseUrl + "api/Messages/MessagesByConversations?ConversationId=",
}