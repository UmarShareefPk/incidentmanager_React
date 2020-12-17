import {React, useEffect} from 'react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {

    useEffect(() => {
        console.log("useeffect");
        return () => {
          console.log("useeffect end");
      }
  });

    return (
      <nav className="nav-wrapper indigo darken-4">
        <div className="container">
          <div className="left">
            <NavLink to="" className="brand-logo">             
              Incident Manager
            </NavLink>
          </div>
          <a href="#" className="sidenav-trigger" data-target="mobile-menu">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a>Incidents</a>
            </li>
            <li>
              <a>
                Users <i className="material-icons"></i>{" "}
              </a>
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
          </ul>
          {/* for mobile */}
          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li>
              <a className="sidenav-close">Incidents</a>
            </li>
            <li>
              <a className="sidenav-close">Users</a>
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
