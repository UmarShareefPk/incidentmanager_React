import moment from "moment";

const Message = ({ message, userId }) => {

    const isSender = message.From == userId ? true: false;

    return (
        <li className='message-li'>
            <div className='message-time'><span title= {moment(message.Date).format("MMMM DD YYYY, h:mm:ss a")}>{moment(message.Date).fromNow() } </span></div>
            <div className={isSender ? "message left" : "message right"}>
                <div className='message-text'>
                   {message.MessageText}
                </div>
            </div>
        </li>
    )
}

export default Message;