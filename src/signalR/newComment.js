import {  JsonHubProtocol,   
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';  /*npm i --save @microsoft/signalr */



export const commentRecieved = () => {
  
    const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44310/hubs/notifications')
        .withAutomaticReconnect()
        .withHubProtocol(new JsonHubProtocol())
        .configureLogging(LogLevel.Information)
        .build();

            newConnection.start()
            .then(result => {
                console.log('Connected!');
                newConnection.on('ReceiveMessage', (message) => {
                   console.log(message);
                    
                });
            })
            .catch(e => console.log('Connection failed: ', e));

}

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
