import {React, useState} from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../store/actions/userLoginActions'
import { Redirect } from 'react-router-dom'
import '../../styles/loginStyles.css'


 function Login(props) {
     const [username , setUsername] = useState('');
     const [password , setPassword] = useState('');

   function loginClick(e){
        e.preventDefault();   
        let credentials = {
            username,
            password
        }  
        props.logIn(credentials);       
   }

    if (props.token) return <Redirect to='/incidentListing' /> 
     
    return (
      <div className="loginMain">
        <div className="row ">
          <div className="col s12 m8 offset-m2 l6 offset-l3 login">
            <h3> WELCOME!</h3>
            <br />
            <h6>User Login</h6>
            <br />
            <form>
              <div className="input-field">
                <i className="material-icons prefix">person</i>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="username" >
                  Your Username
                </label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">password</i>
                <input type="password" id="password"  onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">Your Password</label>
              </div>
              <div className="input-field">
                <a href="/"> Forgot password?</a>
              </div>
              <div className="input-field ">              
                  <p className="red-text">{props.loginError? "Incorret username or password." : "" }</p>
              </div>
              <div className="input-field ">
                <button className="btn indigo darken-2 right" onClick={(e)=>loginClick(e)}>
                  <span>Login</span>
                  <i className="material-icons right">send</i>
                </button>
              </div>             
            </form>
          </div>
        </div>      
      </div>
    );
}

const mapStateToProps = (state) => {
    return{
        user_Name :state.userLogin.user_Name,
        userId :state.userLogin.userId,
        userLogin : state.userLogin.userLogin,
        loginError : state.userLogin.loginError,
        token : state.userLogin.token  
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (creds) => dispatch(logIn(creds))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);