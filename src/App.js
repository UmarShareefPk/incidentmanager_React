import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import IncidentLisiting from './components/Incidents/IncidentLisiting';
import IncidentDetail from './components/Incidents/IncidentDetail';
 import  AddNew  from "./components/Incidents/AddNew";
import { connect } from "react-redux";

function App(props) {
  console.log(props.userLogin);
  return (
    <BrowserRouter>
      <div className="App">
      {props.userLogin ?  <NavBar /> : null }    
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Incident/:id" component={IncidentDetail} />
          <Route exact path="/incidentListing" component={IncidentLisiting} />   
          <Route exact path="/AddNew" component={AddNew} />         
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return{     
    userLogin : state.userLogin.userLogin    
  }
}

export default connect(mapStateToProps)(App);
