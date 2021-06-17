// import { useState } from 'react';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import CommentForm from './CommentForm';
import '../styles/SingleComment.css';

const SingleComment = ({ comment, postId }) => {
    const nestedComments = (comment.children || []).map(comment => {
        return <SingleComment comment={comment} key={comment.commentId} />;
    });

    const [commentForm, setCommentForm] = useState();

    return (
        <>
            <div className="singleCommentContainer" key={comment.id} id={comment.id}>
                <div
                    className="singleCommentAvatar"
                    style={{
                        backgroundImage: `url(http://localhost:8080/images/avatars/${
                            comment.avatar || 'default.jpg'
                        })`,
                    }}
                />
                <div className="singleCommentContent">
                    <span className="singleCommentInfo">
                        <span className="singleCommentUser">{comment.username}</span>{' '}
                        <span className="singleCommentDate">
                            <ReactTimeAgo
                                date={new Date(comment.created_date)}
                                locale="en-US"
                                timeStyle="Round"
                            />
                        </span>
                    </span>
                    <p className="singleCommentText">{comment.text.trim()}</p>
                    <p onClick={() => setCommentForm(!commentForm)} className="replyLink">
                        <i className="bi bi-reply-all-fill"></i> Reply
                    </p>
                    {commentForm && <CommentForm parentId={comment.commentId} />}
                </div>
            </div>
            <div className="nestedComment">{nestedComments}</div>
        </>
    );
};

export default SingleComment;
