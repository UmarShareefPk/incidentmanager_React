import {React} from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/Navbar.css';

function NavBar({user_Name}) {

    return (
      <nav className="nav-wrapper indigo darken-4">
        <div className="container">
          <div className="left">
            <NavLink to="/incidentListing" className="brand-logo">             
              Incident Manager
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
              <a>Contact</a>
            </li>
            <li>
              <a href="" className="btn-floating z-depth-0 indigo darken-4">
                <i className="material-icons">notifications</i>
              </a>
            </li>
            <li>
              <span className="badge white-text new pink">5</span>
            </li>
            <li>
                <button type="button" title={user_Name} className="btn-floating  orange darken-3 userWelcome" >
                  {user_Name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')} 
                 </button>
            </li>
          </ul>
          {/* for mobile */}
          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li>
              <NavLink to="/incidentListing"  className="sidenav-close">             
                  Incidents
                </NavLink>               
            </li>
            <li>
                <NavLink to="/UsersList" className="sidenav-close">             
                       Users
                  </NavLink>            
            </li>
            <li>
              <a className="sidenav-close">Contact</a>
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
  }
}


export default connect(mapStateToProps, null)(NavBar);
