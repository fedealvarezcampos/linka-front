// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { deleteComment } from '../api/comments';
import CommentForm from './CommentForm';
import '../styles/SingleComment.css';
import { useParams } from 'react-router-dom';

const SingleComment = ({ comment }) => {
    const { postId } = useParams();

    const loggedUser = useSelector(s => s.user?.username);
    const token = useSelector(s => s.user?.token);
    const itsMyComment = loggedUser === comment.username;

    const nestedComments = (comment.children || []).map(comment => {
        return <SingleComment comment={comment} key={comment.commentId} />;
    });

    const [deletedComment, setDeletedComment] = useState();
    const [commentForm, setCommentForm] = useState();
    const [nestedList, setNestedList] = useState([]);

    // useEffect(() => {
    //     setDeletedComment();
    // }, [deletedComment]);

    const handleCommentDeletion = async () => {
        try {
            deleteComment(postId, comment.commentId, token);
            setDeletedComment('Comment deleted.');
        } catch (error) {
            console.log(error);
        }
    };

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
                    <p
                        className={`singleCommentText ${
                            comment.deleted || deletedComment ? 'deletedComment' : ''
                        }`}
                    >
                        {deletedComment || comment.text.trim()}
                    </p>
                    {comment.deleted !== 1 && deletedComment !== 'Comment deleted.' && (
                        <p className="commentLinks">
                            <span className="replyLink" onClick={() => setCommentForm(!commentForm)}>
                                <i className="bi bi-reply-all-fill" /> Reply
                            </span>
                            {itsMyComment && token && (
                                <span className="deleteCommentLink" onClick={() => handleCommentDeletion()}>
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
