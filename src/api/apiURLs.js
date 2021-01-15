//const baseUrl = "https://localhost:44398/";
const baseUrl = "https://localhost:44310/";

export const usersUrls = {
    tokenUrl : baseUrl + "token",
    authenticateUrl :  baseUrl + "api/Users/authenticate",
    allUsersUrl : baseUrl + "api/users/AllUsers",
    userssWithPageUrl : baseUrl + "api/Users/GetUsersWithPage?",
    addNewUserUrl : baseUrl + "api/Users/AddUser",
    updateHubIdUrl : baseUrl + "api/Users/UpdateHubId",
    allNotificationsUrl :  baseUrl + "api/Users/UserNotifications"
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