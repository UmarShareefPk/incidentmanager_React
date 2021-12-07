import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import IncidentLisiting from './components/Incidents/IncidentListing/IncidentLisiting';
import UsersList from "./components/Users/UsersList";
import IncidentDetails from './components/Incidents/IncidentDetails/IncidentDetails';
import  AddNew  from "./components/Incidents/AddNew";
import  AddUser  from "./components/Users/AddUser";
import { connect } from "react-redux";
import Receiver from './signalR/Receiver';
import Dashboard from './components/Incidents/Dashboard/Dashboard';
import Messages from './components/Messages/Messages';

function App(props) {
  
  return (
    // add basename properity when run from server basename="/ImReact"
    // in package.json "homepage":"http://localhost/ImReact",
    <BrowserRouter  basename="/ImReact" > 
      <div className="App">     
         <NavBar /> 
         <Receiver />
        <Switch>
          <Route exact path="/" component={Login} /> 
          <Route exact path="/dashboard" component={Dashboard} />                
          <Route exact path="/incidentListing" component={IncidentLisiting} />  
          <Route exact path="/UsersList" component={UsersList} />    
          <Route exact path="/AddNew" component={AddNew} />  
          <Route exact path="/Incident/:id" component={IncidentDetails} />   
          <Route exact path="/AddUser" component={AddUser} />         
        </Switch>
        <Messages />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return{     
    user_Name : state.userLogin.user_Name,
    loginError : state.userLogin.loginError,
    token : state.userLogin.token   
  }
}

export default connect(mapStateToProps)(App);
