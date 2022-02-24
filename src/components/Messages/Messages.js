import { React, useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { messagesByUser, conversationsByUser, messagesByConversations, selectConversation } from "../../store/actions/messagesActions";
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
    selectConversation
}) {

    const [userToggle, setUserToggle] = useState(false);
    const [composeToggle, setComposeToggle] = useState(false);
    const messagesRef = useRef();   
    const [usersInfo, setUsersInfo] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState('');
    const [conversationTitle, setConversationTitle] = useState('');

    useEffect(() => {
        conversationsByUser(userId);   
    }, []);

    useEffect(() => {        
        if(Conversations != null && Conversations.length > 0){
            selectConversation(Conversations[0]);    
        }  
    }, [Conversations])

    useEffect(() => {
        messagesByConversations(SelectedConversation.Id);
        if(SelectedConversation != null && SelectedConversation !={}){
            let user = SelectedConversation.User1 == userId? getUserNameById(SelectedConversation.User2) : getUserNameById(SelectedConversation.User1);
           setConversationTitle(user);        }       
       
    }, [SelectedConversation]);

    useEffect(() => {        
        try{
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;     
        }  catch(e){}
    }, [UserMessages])

    const newConversationAdded = () =>{
        conversationsByUser(userId);  
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
                                {Conversations.map(c => <Conversation key={c.Id + "ll"} conversation={c}  getUserNameById={getUserNameById}  selectedConversation={selectedConversation} />)}

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
                                Conversations.map(c => <Conversation conversation={c} key={c.Id} getUserNameById={getUserNameById}  selectedConversation={selectedConversation} />)
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
                                    <h5 className="left indigo-text darken-4"> {conversationTitle} </h5>
                                    <div className="messages" ref={messagesRef}>
                                        <ul className=''>
                                            {
                                                UserMessages.map(m => (
                                                    <Message key={m.Id} message={m} userId={userId} />
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
        SelectedConversation : state.messages.SelectedConversation
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesByUser: (userId) => dispatch(messagesByUser(userId)),   
        conversationsByUser: (userId) => dispatch(conversationsByUser(userId)),   
        messagesByConversations: (conversationId) => dispatch(messagesByConversations(conversationId)),
        selectConversation: (conversation) => dispatch(selectConversation(conversation)),       
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);