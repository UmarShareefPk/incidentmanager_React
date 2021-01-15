import {React, useRef, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css';
import  '../styles/notifications.css'
import {getAllNotifications} from '../store/actions/notificationsActions';

 function Notifications({getNotifications, userId, notifications}) {

    const ddlRef = useRef(); 
    
    const [unReadCount, setUnReadCount] = useState(notifications.length);

    useEffect(() => {        
        var options = {
            closeOnClick : false
          }
          M.Dropdown.init(ddlRef.current, options);
    }, [])

    useEffect(() => {        
      getNotifications(userId);
  }, [])

    useEffect(() => {        
      setUnReadCount(notifications.length);
  }, [notifications])
  

    return (
      <>
       <li>
        <a
          ref={ddlRef}
          href="#dropdown1"
          className="btn-floating z-depth-0 indigo darken-4 dropdown-trigger"
          data-target="dropdown1"
        >
          <i className="material-icons">notifications</i>
        </a>
        <ul id="dropdown1" className="notifications dropdown-content">
          {notifications == null || notifications.length < 1 ? (
            <li>
              <div className="notification-box">                
                  <p className="">No new notificaitons.</p>               
              </div>
            </li>
          ) : (
            notifications.map((notification) => {
              return (
                <li key={notification.Id}>
                  <div className="notification-box">                                    
                      <p>{notification.NotifyAbout}</p>                   
                  </div>
                </li>
              );
            })
          )}
        </ul>
        </li>
            <li>
              {unReadCount > 0?  <span className="badge white-text new pink">{unReadCount}</span> : null}
             
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
    
  };
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
  