// import { useState } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import CommentForm from './CommentForm';
import '../styles/SingleComment.css';

const SingleComment = ({ comment }) => {
    const token = useSelector(s => s.user?.token);

    const nestedComments = (comment.children || []).map(comment => {
        return <SingleComment comment={comment} key={comment.commentId} />;
    });

    const [commentForm, setCommentForm] = useState();
    const [nestedList, setNestedList] = useState([]);

    console.log(comment);

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
                    <p className={`singleCommentText ${comment.deleted ? 'deletedComment' : ''}`}>
                        {comment.text.trim()}
                    </p>
                    {comment.deleted !== 1 && (
                        <p className="commentLinks">
                            <span className="replyLink" onClick={() => setCommentForm(!commentForm)}>
                                <i className="bi bi-reply-all-fill" /> Reply
                            </span>
                            {token && (
                                <span
                                    className="deleteCommentLink"
                                    onClick={() => setCommentForm(!commentForm)}
                                >
                                    <i className="bi bi-trash-fill" /> Delete
                                </span>
                            )}
                        </p>
                    )}
                    {commentForm && (
                        <CommentForm
                            setCommentForm={setCommentForm}
                            nestedList={nestedList}
                            setNestedList={setNestedList}
                            parentId={comment.commentId}
                        />
                    )}
                </div>
            </div>
            <div className="nestedComment">
                {nestedList &&
                    nestedList.map(comment => <SingleComment key={comment.commentId} comment={comment} />)}
                {nestedComments}
            </div>
        </>
    );
};

export default SingleComment;
