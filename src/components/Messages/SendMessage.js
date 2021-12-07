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
                                        <textarea cols="30" rows="10" placeholder="Write message here" required></textarea>
                                    </div>
                                    <div className="field">
                                        <button type="submit">Send</button>
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