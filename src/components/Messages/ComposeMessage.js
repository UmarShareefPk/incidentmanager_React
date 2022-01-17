import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { sendNewMessage, conversationsByUser } from "../../store/actions/messagesActions";
import  AssigneeDropdown  from "../../components/Incidents/AssigneeDropdown";
import '../../styles/composemessage.css'

function ComposeMessage({
    userId,
    allUsers,
    UserMessages,
    sendNewMessage,
    conversationsByUser,
    setComposeToggle,
    newConversationAdded
}) {


    const [receiver, setReceiver] = useState(null);
    const [receivereName, setReceiverName] = useState("");  
    const [messageText, setMessageText] = useState("");
  
    const sendMessage = (event) => {
        
        event.preventDefault();

        if(messageText.trim() == "" || receiver == null){
            alert("Please select a user and type message.");
            return;
        }
       
        const formData = new FormData(); 

         formData.append("From", userId); 
         formData.append("To", receiver);
         formData.append("MessageText", messageText);     
      
        sendNewMessage(formData);

        setMessageText("");
        setReceiverName("");
        setReceiver(null);
        conversationsByUser(userId);
        setComposeToggle(false);
    }

    return (
        <div className="compose-message-container">    
            <h5>Compose New Message</h5>
                    <form action="#">
                        <div className="field">
                            <AssigneeDropdown
                                updateIncidentByField={null}
                                setAssignee={setReceiver}
                                assigneeName={receivereName}
                                setAssigneeName={setReceiverName}
                            />
                        </div>
                <div className="input-field">
                    <textarea className="materialize-textarea" cols="30" value={messageText} rows="10" onChange={(e) => setMessageText(e.target.value)} placeholder="Write message here" required></textarea>
                </div>

                <div>
                    <button
                        className=" btn green darken-2 updateBtn"
                        onClick={(event) => sendMessage(event)}
                    >
                        <span>Send</span>
                        <i className="material-icons right">send</i>
                    </button>

                    <button
                        className=" btn yellow darken-2 updateBtn"
                        onClick={() => setComposeToggle(false)}
                    >
                        <span>Cancel</span>
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
                    </form>
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
        sendNewMessage: (formData) => dispatch(sendNewMessage(formData)),   
        conversationsByUser: (userId) => dispatch(conversationsByUser(userId)),  
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage); 
