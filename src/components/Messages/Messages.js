import { React, useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { messagesByUser, conversationsByUser, messagesByConversations, selectConversation, deleteConversation } from "../../store/actions/messagesActions";
import '../../styles/messages.css';
import ComposeMessage from './ComposeMessage';
import Reply from './Reply';
import Message from './Message'
import Conversation from './Conversation'

function Messages({
    userId,
    allUsers,
    UserMessages,
    getMessagesByUser,
    conversationsByUser,
    messagesByConversations,
    Conversations, 
    SelectedConversation,
    selectConversation,
    deleteConversation,
    UserMessagesChanged, ConversationsChanged, SelectedConversationChanged
}) {

    const [userToggle, setUserToggle] = useState(false);
    const [composeToggle, setComposeToggle] = useState(false);
    const messagesRef = useRef();  
    const [conversationTitle, setConversationTitle] = useState('');
    const [isScrollDone, setIsScrollDone] = useState(false);

    useEffect(() => {
        conversationsByUser(userId);   
    }, []);

    useEffect(() => {        
        if(Conversations != null && Conversations.length > 0){
            setIsScrollDone(false);   
            selectConversation(Conversations[0]);    
        }  
    }, [ConversationsChanged])

    useEffect(() => {
        setIsScrollDone(false);  
        messagesByConversations(SelectedConversation.Id);
        if(SelectedConversation != null && SelectedConversation !={}){
            let user = SelectedConversation.User1 == userId? getUserNameById(SelectedConversation.User2) : getUserNameById(SelectedConversation.User1);
           setConversationTitle(user);           }       
       
    }, [SelectedConversationChanged]);

    useEffect(() => {        
        try{
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight; 
            setIsScrollDone(true);    
        }  catch(e){}
    }, [UserMessagesChanged])

    const newConversationAdded = () =>{
        conversationsByUser(userId);  
    }

    const delConversation = () => {
        if(window.confirm("Delete conversation forever?")){
            deleteConversation(SelectedConversation.Id);
        }
      
    }

    const getUserNameById = (id) => {   
        let user = allUsers.find((assignee) => {
          return assignee.Id === id;
        });   
        if(!user){    
          return id;
        }
        return user.FirstName + " " + user.LastName
      }
      
        
    return (
        <section>
            <div className="container messages-window">     

                <div className="row">
                    <div className="col s2 m3 hide-on-large-only">
                        <div className="user-toogle" onClick={()=>setUserToggle(!userToggle)}>
                            <span>Users</span>
                            <i className="material-icons center">send</i>
                        </div> 
                    </div>
                    {userToggle? (
                         <div className="col s10 m9 l3 users hide-on-large-only">
                              <div className="compose-message" onClick={()=> setComposeToggle(!composeToggle)}>
                                     <i className="material-icons indigo-text">message</i>
                                    <span className='indigo-text'> Compose Message </span>
                                </div>  
                         <ul className='conversation-list'>                         
                                {Conversations.map(c => <Conversation key={c.Id + "ll"} conversation={c}  getUserNameById={getUserNameById}  />)}

                         </ul>
                     </div>
                    ) : <></>}
                   

                    <div className="col s10 m9 l3 users hide-on-med-and-down">                        
                        <div className="compose-message" onClick={()=> setComposeToggle(!composeToggle)}>
                            <i className="material-icons indigo-text">message</i>
                            <span className='indigo-text'> Compose Message </span>
                        </div>   
                        <ul className='conversation-list'> 
                            {(Conversations != null && Conversations.length > 0)? 
                                Conversations.map(c => <Conversation conversation={c} key={c.Id} getUserNameById={getUserNameById}  />)
                                :
                                <></>
                            }

                        </ul>
                    </div>
                    {composeToggle ? (
                        <div className="col s10 m9 l9  ">
                            <ComposeMessage setComposeToggle={setComposeToggle} newConversationAdded={newConversationAdded} />
                        </div>
                    )
                        :
                        (
                            !userToggle ? (
                                <div className="col s10 m9 l9 ">
                                    <div className="converation-title">
                                        <h5 className="left indigo-text darken-4"> {conversationTitle}
                                        </h5>
                                        <i title="Delete Conversation" onClick={() => delConversation()} className="material-icons red-text lighten-4">delete</i>
                                    </div>
                                    <div className="messages" ref={messagesRef}>
                                        <ul className=''>
                                            {
                                                UserMessages.map((m,index,allM) => (
                                                    <Message key={m.Id} isLast={index+1 === allM.length? true: false} message={m} userId={userId} isScrollDone={isScrollDone} />
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <Reply />
                                </div>

                            ) : <></>
                        )}                  

                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
        allUsers: state.users.users,
        UserMessages : state.messages.Messages,
        Conversations :  state.messages.Conversations,      
        SelectedConversation : state.messages.SelectedConversation,
        UserMessagesChanged : state.messages.MessagesChanged,
        ConversationsChanged :  state.messages.ConversationsChanged,      
        SelectedConversationChanged : state.messages.SelectedConversationChanged
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesByUser: (userId) => dispatch(messagesByUser(userId)),   
        conversationsByUser: (userId) => dispatch(conversationsByUser(userId)),   
        messagesByConversations: (conversationId) => dispatch(messagesByConversations(conversationId)),
        selectConversation: (conversation) => dispatch(selectConversation(conversation)),    
        deleteConversation: (conversationId) => dispatch(deleteConversation(conversationId)),    
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);