import { React, useEffect, useState, useRef } from "react";
import moment from "moment";
import { deleteAttachment, updateComment , deleteComment } from "../../../store/actions/incidentsActions";
import { connect } from "react-redux";
import { incidentsUrls } from "../../../api/apiURLs";
import {setDateTime} from "../../../helpers/common"

function Comment({
  comment,
  getNameById,
  incidentId,
  userId,
  deleteAttachment,
  updateComment,
  deleteComment
}) {

  const [editComment, setEditComment] = useState(false);
  const [commentText, setCommentText] = useState(comment.CommentText);
  const [files, setFiles] = useState(null);

  const commentEditClick = () => {
    setEditComment(!editComment);
    setCommentText(comment.CommentText);
  };
  const commentEditCancel = () => {
    setCommentText(comment.CommentText);
    setEditComment(false);
  };

  const commentEditSave = () => {
    let changedComment = {
      Id : comment.Id,
      IncidentId : incidentId,
      UserId : userId,
      CreateDate : new Date(),
      CommentText : commentText,
      attachments :[]
    }
    updateComment(changedComment);
    setEditComment(false);
  };

  const downloadFile = (file) => {
    window.open(
      incidentsUrls.downloadFileUrl + 
      "type=comment" +
        "&commentId=" +
        file.CommentId +
        "&incidentId=" +
        incidentId +
        "&filename=" +
        file.FileName +
        "&contentType=" +
        file.ContentType
    );
  };

  const deleteFile = (file) => {
    if (
      window.confirm(
        "Are you sure you want to delete this attachment." + file.FileName
      )
    ) {
      deleteAttachment("comment", userId, incidentId, file);  
    }
  };

  const deleteThisComment = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this comment."
      )
    ) {
      deleteComment(comment.Id,incidentId, userId );  
    }
  }

  const setDate = (date) => {
    var newDate = moment(date).format("YYYY-MM-DD h:mm:ss A");
    newDate = new Date(newDate + " UTC");    
    return newDate.toString();
  }

  return (
    <div className="">
      <div className="darkslategrayText comment-header">
        <div>
        <a className="username">{getNameById(comment.UserId)}</a> 
        <small> added a comment - </small>        
        <span className="comment-timestamp"
          title={moment(setDateTime(comment.CreateDate)).format("MMMM DD YYYY, h:mm:ss a")}
        >
           {moment(setDateTime(comment.CreateDate)).fromNow()}
          {/* {moment(comment.CreateDate).fromNow()} */}
        </span>
        </div>
        <span className="comment-actions">
          <i
            title="Edit Comment"
            className="actions-icon material-icons darkslategrayText"
            onClick={commentEditClick}
          >
            edit
          </i>
          <i
            title="Delete Comment"
            className="actions-icon material-icons red-text"
            onClick = {deleteThisComment}
          >
            delete_forever
          </i>
        </span>

      </div>
      {!editComment ? (
        <p className="darkslategrayText comment-text">{comment.CommentText}</p>
      ) : (
        <p className="comment-edit-box">
          <textarea className="materialize-textarea" onChange={(e) => setCommentText(e.target.value)}></textarea>

          <i
            className="right green-text actions-icon material-icons"
            title="Save"
            onClick={commentEditSave}
          >
            check
          </i>
          <i
            className="right yellow-text text-darken-2 actions-icon material-icons"
            title="Cancel"
            onClick={commentEditCancel}
          >
            cancel
          </i>
        </p>
      )}{" "}
      {/* end of edit comment - if */}
      <div className="comment-file-container">
        
          {!comment.attachments
            ? null
            : comment.attachments.map((file) => {
                return (
                  <div className="comment-file" key={file.Id}>

                    <div className="comment-file-text">
                      <span
                        title={file.FileName}
                        // onClick={() => downloadFile(file)}
                      >
                         <i className="actions-icon material-icons orange-text">
                                attachment
                              </i>
                        <span>
                          {file.FileName.length > 20
                            ? file.FileName.slice(0, 20) + "..."
                            : file.FileName}
                          </span>
                      </span>
                    </div>

                    <div className="comment-file-actions">
                      <i
                        title="Remove"
                        className="actions-icon material-icons indigo-text"
                        onClick={() => downloadFile(file)}
                      >
                        download
                      </i>
                      <i
                        title="Remove"
                        className="actions-icon material-icons red-text "
                        onClick={() => deleteFile(file)}
                      >
                        delete_forever
                      </i>
                    </div>
                 
                  </div>
                );
              })}        
      </div>
      <hr></hr>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allAssignees: state.users.users,
    incidentData: state.incidents.IncidentSelected,
    userId :state.userLogin.userId,  // logged in User Id       
  };
};

const mapDispatchToProps = (dispatch) => {
  return {   
    deleteAttachment : (type, userid, incidentId , file) => dispatch(deleteAttachment(type, userid, incidentId ,file)),
    updateComment : (comment) => dispatch(updateComment(comment)),
    deleteComment : (commentId, incidentId, userId) => dispatch(deleteComment(commentId, incidentId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
