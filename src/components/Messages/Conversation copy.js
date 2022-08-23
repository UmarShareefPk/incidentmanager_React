import { React, useState, useEffect, useRef} from 'react'
import moment from "moment";
import { connect } from 'react-redux'
import {selectConversation } from "../../store/actions/messagesActions";

const Conversation = ({ conversation, userId, getUserNameById,  SelectedConversation, selectConversation, setUserToggle})=> {
    
    const user = conversation.User1 == userId? conversation.User2 : conversation.User1;

     console.log("conversation.UnReadCount", conversation.UnReadCount);
    // if( getUserNameById(user) == undefined)
    //     console.log(user);
   
    const conversationSelected = () => {
        console.log("User toogle value:", setUserToggle)
        if(setUserToggle!= null) // for small devices only for large device userToggle will always be null
             setUserToggle(false);
        selectConversation(conversation);
    }
    
    const cssClass = SelectedConversation.Id == conversation.Id ? "user-info selected" : "user-info";

    return (
        <li >
            <div className={cssClass} onClick={() => conversationSelected() }>
                <div className='photo'>
                    <button type="button" title={"Umar Shareef"} className="btn-floating  pink darken-2 userWelcome" >
                         {/* {user ? getUserNameById(user).toUpperCase().split(/\s/).reduce((response, word) => response += word.slice(0, 1), '') : "Null"} 
                          */}
                          <i className='material-icons circle blue'></i>
                    </button>
                </div>
                <div className='name-message'>
                    <div className='name-unread' >
                        <span className='name indigo-text darken-4'>{getUserNameById(user)} </span>
                        {conversation.UnReadCount < 1 ?
                            null :
                            (<span className='unread-count'> new</span>)
                        }
                    </div>
                    <div className='last-message'>
                        <span className='last-message-text'>{conversation.LastMessage.slice(0,20)}</span>
                        <span className='date-time'><span title= {moment(conversation.LastMessageTime).format("MMMM DD YYYY, h:mm:ss a")}>{moment(conversation.LastMessageTime).fromNow() } </span></span>
                    </div>
                </div>
            </div>
            <hr></hr>

        </li>
    )
}
const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
        SelectedConversation : state.messages.SelectedConversation,
        allUsers: state.users.users,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {      
        selectConversation: (conversation) => dispatch(selectConversation(conversation)), 
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
