export const logIn = (credentials) => {
    return (dispatch, getState) => {

     dispatch({ type: 'LOGIN_PASS', credentials });
    }
  }
  
  export const signOut = () => {
    return (dispatch, getState) => {
      
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState) => {
     
    }
  }