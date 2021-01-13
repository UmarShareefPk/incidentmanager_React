import { React, useEffect, useState, useRef } from "react";
import moment from "moment";
import { deleteAttachment, updateComment , deleteComment } from "../../store/actions/incidentsActions";
import { connect } from "react-redux";
import { incidentsUrls } from "../../api/apiURLs";

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

  return (
    <div className="">
      <p className="commentHeader darkslategrayText">
        <a className="username">{getNameById(comment.UserId)}</a> added a
        comment. -{" "}
        <span
          title={moment(comment.CreateDate).format("MMMM DD YYYY, h:mm:ss a")}
        >
          {moment(comment.CreateDate).fromNow()}{" "}
        </span>
        <span className="right">
          <i
            title="Edit Comment"
            className="actions-icon material-icons indigo-text darken-4 inline-icon"
            onClick={commentEditClick}
          >
            edit
          </i>
          <i
            title="Delete Comment"
            className="actions-icon material-icons red-text inline-icon"
            onClick = {deleteThisComment}
          >
            cancel
          </i>
        </span>
      </p>
      {!editComment ? (
        <p className="darkslategrayText">{comment.CommentText}</p>
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
      <p>
        <ul className="commentFiles">
          {!comment.attachments
            ? null
            : comment.attachments.map((file) => {
                return (
                  <li key={file.Id}>
                    <a className="center indigo-text darken-4">
                      {!editComment ? null : (
                        <i
                          title="Remove"
                          className="actions-icon material-icons red-text inline-icon"
                          onClick={() => deleteFile(file)}
                        >
                          cancel
                        </i>
                      )}
                      <span
                        title={file.FileName}
                        onClick={() => downloadFile(file)}
                      >
                        {file.FileName.length > 40
                          ? file.FileName.slice(0, 40) + "..."
                          : file.FileName}
                      </span>
                    </a>
                  </li>
                );
              })}
        </ul>
      </p>
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
