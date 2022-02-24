import {React, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/Navbar.css';
import { Redirect } from 'react-router-dom';
import Notifications from './Notifications';
import { signOut } from "../store/actions/userLoginActions";
import logo from '../images/logo-white.png'
import { allUsers } from "../store/actions/usersActions";

function NavBar({user_Name, loginError, token, signOut, getAllUsers, allUsers, UnreadConversations}) {

  useEffect(() => {    
    console.log("loading users in navbar");  
    getAllUsers();
    }, [token]);

  if (!token){
    //alert("Your session has been expired. Please login again.")
    return <Redirect to='/' /> 
  } 

  const logOut = () => {
    signOut();   
  }
  // if (loginError) return <Redirect to='/' /> 
   
    return (
      <nav className="nav-wrapper ">
        <div className="container">
          <div className="left">

            <NavLink to="/dashboard" className="brand-logo">             
              <img src={logo} />
            </NavLink>
          </div>
          <a href="#" className="sidenav-trigger" data-target="mobile-menu">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>     
              <NavLink to="/incidentListing" >             
                 Incidents
              </NavLink> 
            </li>
            <li>
              <NavLink to="/UsersList" >             
                   Users 
                </NavLink>              
            </li> 
               
            <li>     
              <NavLink to="/messages" className="message-nav " >     
                {/* <i className="material-icons  ">message</i> */}
                Messages
              
              </NavLink> 
              
            </li>    
            {UnreadConversations > 0? (
              <li>
              <span className=" badge white-text new  messages-badge">{UnreadConversations}</span>
            </li>  
            )
            : <></>}
                       
           
              <Notifications />
            <li>
                <button type="button" title={user_Name} className="btn-floating  orange darken-3 userWelcome" >
                  {user_Name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')} 
                 </button>
            </li>
            <li className=" singout-btn">
             <a> <i className="material-icons red-text" onClick={() => logOut()}>logout</i> </a>
            </li>
          </ul>
          {/* for mobile */}
          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li>
              <NavLink to="/Messages" className="sidenav-close">
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidentListing" className="sidenav-close">
                Incidents
              </NavLink>
            </li>
            <li>
              <NavLink to="/UsersList" className="sidenav-close">
                Users
              </NavLink>
            </li>

            <li>
              <a> <i className="material-icons" onClick={signOut}>settings_power</i> </a>
            </li>

            <li>
              <a href="" className=" white-text">
                <i className="material-icons">notifications</i>
                <span className="Indigo-text">5</span>
              </a>

            </li>
          </ul>
        </div>
      </nav>
    );
}


const mapStateToProps = (state) => {        
  return{      
      user_Name :state.userLogin.user_Name, // Logged in User's name
      userId :state.userLogin.userId,  // logged in User Id      
      loginError : state.userLogin.loginError,
      token : state.userLogin.token,
      allUser: state.users.users,   
      UnreadConversations : state.messages.UnreadConversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getAllUsers: () => dispatch(allUsers()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
