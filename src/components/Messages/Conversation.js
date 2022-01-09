import { React, useState, useEffect, useRef} from 'react'

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
                    <button type="button" title={"Umar Shareef"} className="btn-floating  red darken-2 userWelcome" >
                        {getUserNameById(user).toUpperCase().split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                    </button>
                </div>
                <div>
                    <div className='name indigo-text darken-4'>{getUserNameById(user)}</div>
                    <div className='last-message'>{conversation.LastMessage.slice(0,20)}
                        <span className='date-time'>22 Dec</span>
                    </div>
                </div>
            </div>
            <hr></hr>

        </li>
    )
}

export default Conversation;