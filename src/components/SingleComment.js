import { useState } from 'react';

const SingleComment = ({ comment }) => {
    return (
        <li key={comment.id} id={comment.id}>
            <div>
                <span>
                    Comment by <strong>{comment.username}</strong> on <strong>{comment.created_date}</strong>
                </span>
            </div>
            <p>{comment.text.trim()}</p>
        </li>
    );
};

export default SingleComment;
