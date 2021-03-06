// import { useState } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { useSetLogNote } from '../context/LogNoteContext';
import { deleteComment } from '../api/comments';
import CommentForm from './CommentForm';
import '../styles/SingleComment.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { notifyError } from '../helpers/toasts';

const SingleComment = ({ comment, commentNumber, setCommentNumber }) => {
    const { REACT_APP_SERVER: baseURL } = process.env;
    const { REACT_APP_STATIC: staticURL } = process.env;

    const setLogNote = useSetLogNote();
    const { pathname: actualURL } = useLocation();
    const { postId } = useParams();

    const loggedUser = useSelector(s => s.user?.username);
    const token = useSelector(s => s.user?.token);
    const itsMyComment = loggedUser === comment.username;

    const nestedComments = (comment.children || []).map(comment => {
        return (
            <SingleComment
                commentNumber={commentNumber}
                setCommentNumber={setCommentNumber}
                comment={comment}
                key={comment.commentId}
            />
        );
    });

    const [deletedComment, setDeletedComment] = useState();
    const [commentForm, setCommentForm] = useState();
    const [nestedList, setNestedList] = useState([]);

    const handleCommentDeletion = async () => {
        try {
            deleteComment(postId, comment.commentId, token);
            setDeletedComment('Comment deleted.');
            setCommentForm(false);
        } catch (error) {
            error?.response && notifyError(error.response.data.error);
            setLogNote(true);
        }
    };

    return (
        <>
            <div className="singleCommentContainer" key={comment.id} id={comment.id}>
                <Link
                    to={comment.username !== 'Account suspended' ? `/users/${comment.username}` : actualURL}
                    className={`singleCommentAvatar ${
                        comment.username === 'Account suspended' ? 'suspendedAvatar' : ''
                    }`}
                    style={
                        comment?.avatar
                            ? { backgroundImage: `url(${staticURL}images/avatars/${comment.avatar})` }
                            : { backgroundImage: `url(${baseURL}images/avatars/default.jpg)` }
                    }
                />
                <div className="singleCommentContent">
                    <span className="singleCommentInfo">
                        <span className="singleCommentUser">
                            {comment.username !== 'Account suspended' ? (
                                <Link to={`/users/${comment.username}`}>{comment.username}</Link>
                            ) : (
                                <span className="suspendedUser">
                                    suspended account <i className="bi bi-x-octagon-fill" />
                                </span>
                            )}
                        </span>
                        <span className="singleCommentDate">
                            <ReactTimeAgo
                                date={new Date(comment.created_date)}
                                locale="en-US"
                                timeStyle="Round"
                            />
                        </span>
                    </span>
                    <p
                        className={`singleCommentText ${
                            comment.deleted || deletedComment ? 'deletedComment' : ''
                        }`}
                    >
                        {deletedComment || comment.text.trim()}
                    </p>
                    {comment.deleted !== 1 &&
                        deletedComment !== 'Comment deleted.' &&
                        comment.username !== 'Account suspended' && (
                            <p className="commentLinks">
                                {token && (
                                    <span className="replyLink" onClick={() => setCommentForm(!commentForm)}>
                                        <i className="bi bi-reply-all-fill" /> Reply
                                    </span>
                                )}
                                {itsMyComment && token && (
                                    <span
                                        className="deleteCommentLink"
                                        onClick={() => handleCommentDeletion()}
                                    >
                                        <i className="bi bi-trash-fill" /> Delete
                                    </span>
                                )}
                            </p>
                        )}
                    {commentForm && (
                        <CommentForm
                            commentNumber={commentNumber}
                            setCommentNumber={setCommentNumber}
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
                    nestedList.map(comment => (
                        <SingleComment
                            commentNumber={commentNumber}
                            setCommentNumber={setCommentNumber}
                            key={comment.commentId}
                            comment={comment}
                        />
                    ))}
                {nestedComments}
            </div>
        </>
    );
};

export default SingleComment;
