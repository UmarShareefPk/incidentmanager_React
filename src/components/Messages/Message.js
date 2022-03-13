import { React, useState, useEffect, useRef} from 'react';
import moment from "moment";
import { connect } from 'react-redux'
import {deleteMessage,changeMessageStatus } from "../../store/actions/messagesActions";

const Message = ({ message, userId, deleteMessage, changeMessageStatus, isLast, isScrollDone }) => {

    const isSender = message.From == userId ? true: false;
    const ref = useRef();    
    const isVisible = useOnScreen(ref);    
  

    useEffect(() => {
        if(!isSender && isScrollDone){
            if(message.Status.toLowerCase().trim() == "unread" ){
                console.log( message.MessageText);
                changeMessageStatus(message.Id, "read");
            }
        }      
    }, [isVisible])
    
   

    const delMessage = (messageId) => {
        if(window.confirm("Delete message forever?")){
            deleteMessage(messageId);
        }
    }

    return (       
           
        <li className='message-li' ref={ref}>
            {/* {isLast? <span ref={lastRef}> </span> : null} */}
            <div className='message-time'><span title= {moment(message.Date).format("MMMM DD YYYY, h:mm:ss a")}>{moment(message.Date).fromNow() } </span></div>
            <div className={ (message.Status =="Unread" && !isSender? "unread" : "") + " " +(isSender ? "message left" : "message right")}>
                <div className='message-text'>
                {message.MessageText}
                </div>
                <i title="Delete Message" onClick={()=> delMessage(message.Id)} className="delete-message-icon material-icons lighten-4">highlight_off</i>
            </div>
        </li>       
    )
}

function useOnScreen(refx) {

    const [isIntersecting, setIntersecting] = useState(false);  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )  
    useEffect(() => {
      observer.observe(refx.current);
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])  
    return isIntersecting
  }

const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {      
        deleteMessage: (MessageId) => dispatch(deleteMessage(MessageId)),
        changeMessageStatus: (messageId, status) => dispatch(changeMessageStatus(messageId, status))        
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(Message);