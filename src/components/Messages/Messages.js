import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { messagesByUser } from "../../store/actions/messagesActions";
import SendMessage from './SendMessage';

function Messages({
    userId,
    allUsers,
    UserMessages,
    getMessagesByUser
}) {
    useEffect(() => {
        getMessagesByUser(userId);
        
    }, [])
       
    
    return (
        <div>
            <SendMessage />
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
        allUsers: state.users.users,
        UserMessages : state.messages.Messages,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesByUser: (userId) => dispatch(messagesByUser(userId)),    
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);