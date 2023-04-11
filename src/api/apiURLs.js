//const baseUrl = "https://localhost:44398/";
//https://192.168.100.178:44310/
//export const baseUrl = "http://im/IMCore/";
//export const baseUrl = "https://localhost:44310/";
export const baseUrl = "https://imwebapicore.azurewebsites.net/";

export const baseUrl2 = "https://localhost:7248/";
//export const baseUrl2 ="https://imnet7mongodbapi.azurewebsites.net/";

export const usersUrls = {
    tokenUrl : baseUrl + "token",
    authenticateUrl :  baseUrl2 + "api/Users/authenticate",
    allUsersUrl : baseUrl2 + "api/users/AllUsers",
    userssWithPageUrl : baseUrl2 + "api/Users/GetUsersWithPage?",
    addNewUserUrl : baseUrl2 + "api/Users/AddUser",
    updateHubIdUrl : baseUrl2 + "api/Users/UpdateHubId",
    allNotificationsUrl :  baseUrl2 + "api/Users/UserNotifications",
    setNotificationStatusUrl : baseUrl2 + "api/Users/UpdateIsRead"
}

export const incidentsUrls = {
    incidentsWithPageUrl : baseUrl2 + "api/Incidents/GetIncidentsWithPage?",
    addNewIncidentUrl : baseUrl2 + "api/Incidents/AddIncident",
    addNewCommentUrl : baseUrl2 + "api/Incidents/AddComment",
    deleteCommentUrl : baseUrl2 + "api/Incidents/DeleteComment?",
    updateIncidentUrl : baseUrl2 + "api/Incidents/UpdateIncident",
    updateCommentUrl : baseUrl2 + "api/Incidents/UpdateComment",    
    getIncidentByIdUrl : baseUrl2 + "api/Incidents/IncidentById?Id=",
    deleteAttachmentUrl : baseUrl2 + "api/Incidents/DeleteFile?",
    downloadFileUrl : baseUrl2 + "api/Incidents/DownloadFile?",
}

export const dashboardUrls = {
    kpiUrl : baseUrl2 + "api/Incidents/KPI?userId=",
    overallWidgetUrl : baseUrl2 + "api/Incidents/OverallWidget",
    last5IncidentsUrl : baseUrl2 + "api/Incidents/Last5Incidents",
    oldest5UnresolvedIncidentsUrl : baseUrl2 + "api/Incidents/Oldest5UnresolvedIncidents?",
    mostAssignedToUsersIncidentsUrl : baseUrl2 + "api/Incidents/MostAssignedToUsersIncidents",
}

export const messagesUrls = {
   messagesByUserUrl : baseUrl2 + "api/Messages/MessagesByUser?UserId=",
   sendMessageUrl :  baseUrl2 + "api/Messages/AddMessage",
   conversationsByUserUrl :  baseUrl2 + "api/Messages/ConversationsByUser?UserId=",
   messagesByConversationsUrl :  baseUrl2 + "api/Messages/MessagesByConversations?ConversationId=",
   deleteConversationUrl :  baseUrl2 + "api/Messages/DeleteConversation?ConversationId=",
   deleteMessageUrl :  baseUrl2 + "api/Messages/DeleteMessage?MessageId=",
   changeMessageStatusUrl :  baseUrl2 + "api/Messages/ChangeMessageStatus?MessageId=",
}
