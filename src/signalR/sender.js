import {  JsonHubProtocol,   
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';  /*npm i --save @microsoft/signalr */

import { baseUrl, baseUrl2 } from "../api/apiURLs";


export   const incidentUpdatedSignalR =  (incidentId, userId) => {
const connection = new HubConnectionBuilder()
//.withUrl('https://localhost:44310/hubs/notifications')
.withUrl(baseUrl2 + 'hubs/notifications')
.withAutomaticReconnect()
.withHubProtocol(new JsonHubProtocol())
.configureLogging(LogLevel.Information)
.build();

connection.start().then(()=>{
    console.log(connection.connectionStarted);
    if (connection.connectionStarted) {
        try {
            connection.send("SendIncidentUpdate", incidentId, userId);
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("No connection to server yet.");
      }
})      

};

export   const sendMessageSignalR =  (conversationId, userId, newMessage, isNewConversation) => {
  const connection = new HubConnectionBuilder()
  //.withUrl('https://localhost:44310/hubs/notifications')
  .withUrl(baseUrl2 + 'hubs/notifications')
  .withAutomaticReconnect()
  .withHubProtocol(new JsonHubProtocol())
  .configureLogging(LogLevel.Information)
  .build();
  
  connection.start().then(()=>{
      console.log(connection.connectionStarted);
      if (connection.connectionStarted) {
          try {
              connection.send("SendMessageAsync", conversationId, userId, newMessage, isNewConversation);
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("No connection to server yet.");
        }
  })      
  
  };
  


export   const commentSent =  (message) => {
      const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44310/hubs/notifications')
      .withAutomaticReconnect()
      .withHubProtocol(new JsonHubProtocol())
      .configureLogging(LogLevel.Information)
      .build();

      connection.start().then(()=>{
          console.log(connection.connectionStarted);
          if (connection.connectionStarted) {
              try {
                  connection.send("Send", message);
              } catch (e) {
                console.log(e);
              }
            } else {
              alert("No connection to server yet.");
            }
      })      
  
  };


