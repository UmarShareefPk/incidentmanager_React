import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../store/actions/userLoginActions'
import { Redirect } from 'react-router-dom'



 function Login(props) {

   function handleClick(e){
        e.preventDefault();     
        props.logIn("Test");
    }

     console.log(props.signIn);
    return (
        <div>
            <h1>This is IM login</h1>
            <h1>User Login : {props.userLogin}</h1>
            <h1>IsLoggedIn : {props.isLoggedIn? "Yes" : "NO"}</h1>
            <h1>token : {props.token}</h1>
            <button onClick={(e)=>handleClick(e)}>Click me</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userLogin : state.userLogin.userLogin,
        isLoggedIn : state.userLogin.isLoggedIn,
        token : state.userLogin.token  
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (creds) => dispatch(logIn(creds))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);