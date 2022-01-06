import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { sendNewMessage } from "../../store/actions/messagesActions";
import  AssigneeDropdown  from "../../components/Incidents/AssigneeDropdown";
import '../../styles/composemessage.css'

function ComposeMessage({
    userId,
    allUsers,
    UserMessages,
    sendNewMessage
}) {


    const [receiver, setReceiver] = useState(null);
    const [receivereName, setReceiverName] = useState("");  
    const [messageText, setMessageText] = useState("");
  
    const sendMessage = (event) => {
        event.preventDefault();
        const formData = new FormData(); 

        // if(files){
        //     for(let i = 0; i < files.length ; i++){
        //       formData.append( 
        //         "Attachment" + i+1, 
        //         files[i], 
        //         files[i].name 
        //       );
        //     }
        // }   
         formData.append("From", userId); 
         formData.append("To", receiver);
         formData.append("MessageText", messageText);     
        console.log("formData", formData);
        sendNewMessage(formData);
    }

    return (
        <div className="compose-message-container">    
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
                    <textarea className="materialize-textarea" cols="30" rows="10" onChange={(e) => setMessageText(e.target.value)} placeholder="Write message here" required></textarea>
                </div>

                <div>
                    <button
                        className=" btn green darken-1 updateBtn"
                        onClick={(event) => sendMessage(event)}
                    >
                        <span>Send</span>
                        <i className="material-icons right">send</i>
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
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage); 
