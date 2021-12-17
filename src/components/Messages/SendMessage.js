import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { sendNewMessage } from "../../store/actions/messagesActions";
import  AssigneeDropdown  from "../../components/Incidents/AssigneeDropdown";
import '../../styles/chatbox.css';

function SendMessage({
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
        <div className="container">
        <div className="row">
          <div className="col s12 l12 chatbox-container">    
           

                            <input type="checkbox" id="click" />
                                <label for="click">
                                <i className="fab fa-facebook-messenger"></i>
                                <i className="fas fa-times"></i>
                                +
                                </label>
                                <div className ="wrapper">
                                <div className="head-text">Umar Shareef</div>
                                <div className="chat-box">
                                    <div className="desc-text">Message connot be empty.</div>
                                    <form action="#">
                                    <div className="field">
                                        <AssigneeDropdown
                                                updateIncidentByField={null}
                                                setAssignee={setReceiver}
                                                assigneeName = {receivereName}
                                                setAssigneeName = {setReceiverName}
                                        />
                                    </div>                                   
                                    <div className="field textarea">
                                        <textarea cols="30" rows="10" onChange={(e) => setMessageText(e.target.value)} placeholder="Write message here" required></textarea>
                                    </div>
                                    <div className="field">
                                        <button type="submit" onClick={(event)=> sendMessage(event)} >Send</button>
                                    </div>
                                    </form>
                                </div>
                                </div>
        </div>
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
        sendNewMessage: (formData) => dispatch(sendNewMessage(formData)),    
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);