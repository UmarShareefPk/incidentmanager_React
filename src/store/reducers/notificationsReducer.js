const initState = {
   notifications : []
   
   }
   
   const notificationsReducer = (state = initState, action) => {
     switch (action.type) {
       case "COMMENT_RECIEVED":
         console.log(action);
         console.log(state.notifications);
         let nn = [...state.notifications, action.comment];
         return {
           ...state,
           notifications: nn,
         };
       case "GET_ALL_NOTIFICATIONS":
         return {
           ...state,
           notifications: action.data,
         };

       case "STATUS_CHANGED":
         var noti = action.data;

         let notifications = state.notifications.map((notification) => {
           if (notification.Id === noti.id) {
             notification.IsRead = noti.isRead;
           }
           return notification;
         });

         return {
           ...state,
           notifications: notifications,
         };

       case "SIGN_OUT":
         return {
           ...state,
         notifications : []
         };

       default:
         return state;
     }
   };
   
   export default notificationsReducer;
                  