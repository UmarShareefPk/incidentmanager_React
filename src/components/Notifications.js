import {React, useRef, useEffect, useState} from 'react'
import {  useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';
import  '../styles/notifications.css'
import {getAllNotifications, setNotificationStatus} from '../store/actions/notificationsActions';
import { removeIncidentData, getIncidentById } from "../store/actions/incidentsActions";
import moment from "moment";

 function Notifications({
   getNotifications,
   userId,
   notifications,
   setNotificationStatus,
   removeIncidentData,
   getIncidentById
 }) {
   const ddlNotiRef = useRef();
   const history = useHistory();

   const [unReadCount, setUnReadCount] = useState(    
      notifications!=null && notifications.length >0 ? notifications.filter((notification) => !notification.IsRead).length : 0     
   );

   useEffect(() => {
     var options = {
       closeOnClick: false,
     };
     M.Dropdown.init(ddlNotiRef.current, options);
   }, []);

   useEffect(() => {
     getNotifications(userId);
   }, []);

   useEffect(() => {
     setUnReadCount(
      notifications!=null && notifications.length >0 ? notifications.filter((notification) => !notification.IsRead).length : 0     
     );
   }, [notifications]);

   const setStatus = (id, status) => {
     setNotificationStatus(id, status);
   };

   const openIncident = (notification) => {
     setStatus(notification.Id, true);

     let path = "/Incident/" + notification.IncidentId;
     if (history.location.pathname !== path) {
       // only change path if it is different      
       removeIncidentData(); // So that user does not see old data that is stored in redux (and local storage)
     }
     else{
      M.Dropdown.getInstance(ddlNotiRef.current).close();
      getIncidentById(notification.IncidentId); //if already on the same incident, just get new data and update page
     }
     history.push(path);
   };

   console.log("in Notifications");

   return (
     <>
       <li>
         <a
           ref={ddlNotiRef}
           href="#dropdown1"
           className="btn-floating z-depth-0  dropdown-trigger badge-a"
           data-target="dropdownNotifications"
         >
           <i className="material-icons">notifications</i>
         </a>
         <ul
           id="dropdownNotifications"
           className="notifications dropdown-content"
         >
           {notifications == null || notifications.length < 1 ? (
             <li>
               <div className="notification-box">
                 <p className="">No new notificaitons.</p>
               </div>
             </li>
           ) : (
             notifications.map((notification) => {
               let classes = notification.IsRead
                 ? "notification-box read"
                 : "notification-box unread";
               return (
                 <li key={notification.Id}>
                   <div className={classes}>
                     <span className='icon'>
                       {notification.IsRead ? (
                         <i
                           className="material-icons readIcon"
                           title="Mark Unread"
                           onClick={() => setStatus(notification.Id, false)}
                         >
                           drafts
                         </i>
                       ) : (
                         <i
                           className="material-icons readIcon"
                           title="Mark Read"
                           onClick={() => setStatus(notification.Id, true)}
                         >
                           email
                         </i>
                       )}
                     </span>

                     <p className='text indigo-text darken-4' onClick={() => openIncident(notification)}>
                       {" "}
                       {notification.NotifyAbout}
                     </p>

                     <p className='time'>
                      <span title= {moment(notification.CreateDate).format("MMMM DD YYYY, h:mm:ss a")}>{moment(notification.CreateDate).fromNow() } </span>                      
                     </p>
                         
                       
                   </div>
                 </li>
               );
             })
           )}
         </ul>
       </li>
       <li>
         {unReadCount > 0 ? (
           <span className="badge notification-badge white-text new pink">{unReadCount}</span>
         ) : null}
       </li>
     </>
   );
 }

const mapStateToProps = (state) => {        
    return{      
        notifications :state.notifications.notifications,
        userId :state.userLogin.userId  // logged in User Id   
    }
  }  

const mapDispatchToProps = (dispatch) => {
  return {
      getNotifications: (userid) => dispatch(getAllNotifications(userid)),
      setNotificationStatus : (id, isRead) => dispatch(setNotificationStatus(id, isRead)),
      removeIncidentData : () => dispatch(removeIncidentData()),
      getIncidentById: (incidentId) => dispatch(getIncidentById(incidentId)), 
    };
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
  