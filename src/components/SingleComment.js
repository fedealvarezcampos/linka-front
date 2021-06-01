// import { useState } from 'react';
import '../styles/SingleComment.css';

const SingleComment = ({ comment }) => {
    return (
        <li className="singleCommentContainer" key={comment.id} id={comment.id}>
            <div
                className="singleCommentAvatar"
                style={{ backgroundImage: `url(http://localhost:8080/images/avatars/${comment.avatar})` }}
            />
            <div className="singleCommentContent">
                <span className="singleCommentInfo">
                    <span className="singleCommentUser">{comment.username}</span>{' '}
                    <span className="singleCommentDate">
                        {new Date(comment.created_date).toLocaleString()}
                    </span>
                </span>
                <p className="singleCommentText">{comment.text.trim()}</p>
            </div>
        </li>
    );
};

export default SingleComment;
