import {React, useRef, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css';
import  '../styles/notifications.css'

 function Notifications() {

    const ddlRef = useRef(); 
    const [notifcaitonsList, setNotificationList] = useState([1,2,3,4]);

    useEffect(() => {        
        var options = {
            closeOnClick : false
          }
          M.Dropdown.init(ddlRef.current, options);
    }, [])

    return (
      <>
        <a
          ref={ddlRef}
          href="#dropdown1"
          className="btn-floating z-depth-0 indigo darken-4 dropdown-trigger"
          data-target="dropdown1"
        >
          <i className="material-icons">notifications</i>
        </a>
        <ul id="dropdown1" className="notifications dropdown-content">
          {notifcaitonsList.length < 1 ? (
            <li>
              <div className="card notification-card">
                <div className="card-content">
                  <p className="">No new notificaitons.</p>
                </div>
              </div>
            </li>
          ) : (
            notifcaitonsList.map((note) => {
              return (
                <li>
                  <div className="card notification-card">
                    <div className="card-content">
                      <h6>Umar Shareef created an Incident </h6>
                      <p>Title will show here</p>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </>
    );
}

const mapStateToProps = (state) => {        
    return{      
        notifications :state.notifications.notifications      
    }
  }  
  
  export default connect(mapStateToProps, null)(Notifications);
  