import { React, useState, useEffect, useRef} from 'react'
import moment from "moment";

const Conversation = ({ conversation, allUsers, userId, getUserNameById, conversationClicked, selectedConversation})=> {
    const user = conversation.User1 == userId? conversation.User2 : conversation.User1;

    
    const conversationSelected = (id) => {
        conversationClicked(id);
    }
    
    const cssClass = selectedConversation == conversation.Id ? "user-info selected" : "user-info";

    return (
        <li >
            <div className={cssClass} onClick={() => conversationSelected(conversation.Id)}>
                <div className='photo'>
                    <button type="button" title={"Umar Shareef"} className="btn-floating  pink darken-2 userWelcome" >
                        {getUserNameById(user).toUpperCase().split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                    </button>
                </div>
                <div className='name-message'>
                    <div className='name-unread' >
                        <span className='name indigo-text darken-4'>{getUserNameById(user)} </span>
                        {conversation.UnReadCount == 0 ?
                            null :
                            (<span className='unread-count'>{conversation.UnReadCount} new</span>)
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

export default Conversation;