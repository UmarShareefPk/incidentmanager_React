import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { replyMessage } from "../../store/actions/messagesActions";

const Reply = ({
    userId,      
    replyMessage,
    UserMessages,
    SelectedConversation
}) => {

    const [messageText, setMessageText] = useState("");
  
    const sendMessage = (event) => {
        event.preventDefault();
       
        let To =  SelectedConversation.User1 == userId? SelectedConversation.User2 : SelectedConversation.User1;
        let conversationId = SelectedConversation.Id;
        const formData = new FormData(); 

         formData.append("From", userId); 
         formData.append("To", To);
         formData.append("MessageText", messageText);     
        
         replyMessage(formData, conversationId);
        setMessageText("");     
    }
    
    const keyPressedOnMessageText = (e) =>{
        console.log(e.keyCode);
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
                    // onKeyDown={(e) => keyPressedOnMessageText(e)}
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
        SelectedConversation : state.messages.SelectedConversation,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        replyMessage: (formData, conversationId) => dispatch(replyMessage(formData, conversationId)),    
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Reply); 

