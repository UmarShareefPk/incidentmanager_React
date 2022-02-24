import moment from "moment";
import { connect } from 'react-redux'
import {deleteMessage } from "../../store/actions/messagesActions";

const Message = ({ message, userId, deleteMessage }) => {

    const isSender = message.From == userId ? true: false;

    const delMessage = (messageId) => {
        if(window.confirm("Delete message forever?")){
            deleteMessage(messageId);
        }
    }

    return (
        <li className='message-li'>
            <div className='message-time'><span title= {moment(message.Date).format("MMMM DD YYYY, h:mm:ss a")}>{moment(message.Date).fromNow() } </span></div>
            <div className={isSender ? "message left" : "message right"}>
                <div className='message-text'>
                   {message.MessageText}
                </div>
                <i title="Delete Message" onClick={()=> delMessage(message.Id)} className="delete-message-icon material-icons lighten-4">highlight_off</i>
            </div>
        </li>
    )
}

const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {      
        deleteMessage: (MessageId) => dispatch(deleteMessage(MessageId))    
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(Message);