import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import IncidentLisiting from './components/Incidents/IncidentLisiting';
import UsersList from "./components/Users/UsersList";
import IncidentDetails from './components/Incidents/IncidentDetails';
 import  AddNew  from "./components/Incidents/AddNew";
 import  AddUser  from "./components/Users/AddUser";
import { connect } from "react-redux";

function App(props) {
 
  return (
    <BrowserRouter>
      <div className="App">     
      {props.user_Name ?  <NavBar /> : null }    
        <Switch>
          <Route exact path="/" component={Login} />          
          <Route exact path="/incidentListing" component={IncidentLisiting} />  
          <Route exact path="/UsersList" component={UsersList} />    
          <Route exact path="/AddNew" component={AddNew} />  
          <Route exact path="/Incident/:id" component={IncidentDetails} />   
          <Route exact path="/AddUser" component={AddUser} />         
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return{     
    user_Name : state.userLogin.user_Name    
  }
}

export default connect(mapStateToProps)(App);
