import { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';
import { useSetLogNote } from '../context/LogNoteContext';
import { useModal, useSetModal } from '../context/ModalContext';
import nestComments from '../helpers/nestComments';
import { useGetSinglePost, likePost, deletePost } from '../api/posts';
import { useGetComments } from '../api/comments';
import Spinner from '../assets/Spinner';
import Modal from '../components/Modal';
import LinkPreview from './LinkPreview';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import '../styles/SinglePostPage.css';
import '../styles/Post.css';
import { notifyMessage } from '../helpers/toasts';

function SinglePostPage({ setError }) {
    const setLogNote = useSetLogNote();
    const modal = useModal();
    const setModal = useSetModal();

    const { postId } = useParams();

    const user = useSelector(s => s?.user);
    const token = useSelector(s => s.user?.token);

    const commentsFullData = useGetComments(postId);

    const post = useGetSinglePost(postId, token);
    const itsMyPost = user?.id === post?.userId;

    const postLikes = post?.likes;
    const comments = post?.commented;

    const [likes, setLikes] = useState();
    const [commentList, setCommentList] = useState([]);
    const [commentNumber, setCommentNumber] = useState(comments);
    const [nestedComments, setNestedComments] = useState();
    const [linkIsDeleted, setLinkIsDeleted] = useState(false);

    useEffect(() => {
        setNestedComments(nestComments(commentsFullData));
    }, [commentsFullData]);

    useEffect(() => {
        setLikes(postLikes);
    }, [postLikes]);

    useEffect(() => {
        setCommentNumber(comments);
    }, [comments]);

    if (!post) {
        return <Spinner />;
    }

    let body;

    const handleLikeClick = async e => {
        e.preventDefault();
        try {
            const response = await likePost(postId, body, token);
            response.likeId !== null ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleDeleteClick = async e => {
        e.preventDefault();
        try {
            await deletePost(postId, token);
            setModal(!modal);
            setError('');
            setLinkIsDeleted(true);
            notifyMessage('All gone!');
        } catch (error) {
            setError(error.response.data.error);
            setLogNote(true);
        }
    };

    if (linkIsDeleted) {
        return <Redirect to="/" />;
    }

    const notify = () => {
        setLogNote(true);
        toast.error('Liking your posts is not cool 🦂', {
            position: 'bottom-right',
            limit: '3',
        });
    };

    return (
        <>
            {modal && postId && token && (
                <Modal handleDeleteClick={handleDeleteClick} setError={setError}></Modal>
            )}
            {post && (
                <div className="postContainer singlePostContainer">
                    <div className="postInfo">
                        <i className="ci-link_02"></i>
                        <span className="postInfoText">
                            shared by{' '}
                            <span>
                                {post?.username !== 'Account suspended' && (
                                    <Link to={`/users/${post.username}`}>{post.username}</Link>
                                )}
                                {post.username === 'Account suspended' && (
                                    <span className="accountSuspended">suspended account</span>
                                )}
                            </span>{' '}
                            <ReactTimeAgo date={new Date(post.created_date)} locale="en-US" />
                        </span>
                    </div>
                    <div className="postContent">
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <LinkPreview post={post} />
                        {token && itsMyPost && (
                            <div className="deletePostLink">
                                <span onClick={() => setModal(true)}>
                                    <i className="bi bi-trash-fill" /> Delete this link
                                </span>
                            </div>
                        )}
                        <hr />
                        <div className="postFooter">
                            <div className="postFooterComments">
                                <div className="postCommentsContainerSingle">
                                    <i className="bi bi-chat-fill"></i>
                                    <span>
                                        {(post && commentNumber) || 'No'}{' '}
                                        {post.commented === 1 ? 'comment' : 'comments'}
                                    </span>
                                </div>
                            </div>
                            <div className="postFooterLikes">
                                <div
                                    className="postLikesContainerSingle"
                                    onClick={
                                        (token && !itsMyPost ? handleLikeClick : undefined) ||
                                        (itsMyPost ? notify : undefined)
                                    }
                                >
                                    <span>{likes || 0}</span>
                                    <i className="bi bi-heart-fill"></i>
                                </div>
                            </div>
                        </div>
                        <CommentForm
                            commentNumber={commentNumber}
                            setCommentNumber={setCommentNumber}
                            commentList={commentList}
                            setCommentList={setCommentList}
                            setError={setError}
                        />
                        <hr />
                        {commentList?.length !== 0 || nestedComments?.length !== 0 ? (
                            <CommentList
                                commentNumber={commentNumber}
                                setCommentNumber={setCommentNumber}
                                commentsData={nestedComments}
                                commentList={commentList}
                                postId={postId}
                            />
                        ) : (
                            <div className="noCommentsHere">No hay comentarios</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default SinglePostPage;
