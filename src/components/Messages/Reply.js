import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { replyMessage } from "../../store/actions/messagesActions";

const Reply = ({
    userId,      
    replyMessage,
    UserMessages
    
}) => {

    const [messageText, setMessageText] = useState("");
  
    const sendMessage = (event) => {
        event.preventDefault();

        let To = UserMessages[0].From == userId? UserMessages[0].To : UserMessages[0].From;
        let conversationId = UserMessages[0].ConversationId;
        const formData = new FormData(); 

         formData.append("From", userId); 
         formData.append("To", To);
         formData.append("MessageText", messageText);     
        
         replyMessage(formData, conversationId);
        setMessageText("");
     
    }

    return (
        <div className="new-message-window">
            <div className="input-field">
                <textarea
                    id="comment"
                    className="materialize-textarea"
                    placeholder='Write new message'
                     value={messageText}
                     onChange={(e) => setMessageText(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button
                    className="left btn green darken-2 updateBtn"
                    onClick={(event) => sendMessage(event)}
                >
                    <span>Send</span>
                    <i className="material-icons right">send</i>
                </button>
            </div>
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
        replyMessage: (formData, conversationId) => dispatch(replyMessage(formData, conversationId)),    
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Reply); 

