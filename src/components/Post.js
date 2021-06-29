import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyAuth } from '../helpers/toasts';
import { likePost } from '../api/posts';
import LinkPreview from './LinkPreview';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Post.css';

function Post({ post, username, setError }) {
    const setLogNote = useSetLogNote();
    const user = useSelector(s => s?.user);
    const token = useSelector(s => s.user?.token);
    const itsMyPost = user?.id === post.userId;

    const [likes, setLikes] = useState(post?.likes || 0);

    const postId = post.postId || post.id;
    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();

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

    const handleNote = (token, itsMyPost) => {
        setLogNote(true);
        notifyAuth(token, itsMyPost);
    };

    const postDate = new Date(post.created_date);

    return (
        <>
            <article>
                <li className="postContainer">
                    <div className="postInfo">
                        <i className="ci-link_02"></i>
                        <span className="postInfoText">
                            shared by{' '}
                            <span>
                                {(post.username || username) !== 'Account suspended' && (
                                    <Link to={`/users/${post?.username || username}`}>
                                        {post.username || username}
                                    </Link>
                                )}
                                {(post.username || username) === 'Account suspended' && (
                                    <span className="accountSuspended">suspended account</span>
                                )}
                            </span>{' '}
                            <ReactTimeAgo date={postDate} locale="en-US" />
                        </span>
                    </div>
                    <div className="postContent">
                        <Link
                            className="postContentLink"
                            to={token ? `/posts/${postId}/${postTitleURL}` : `/`}
                            onClick={!token ? () => handleNote(token, itsMyPost) : null}
                        >
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                        </Link>
                        <LinkPreview notify={handleNote} post={post} />
                    </div>
                    <div className="postFooter">
                        <div className="postFooterComments">
                            <Link
                                to={token ? `/posts/${postId}/${postTitleURL}` : `/`}
                                className="postFooterContentContainer"
                                onClick={!token ? () => handleNote(token, itsMyPost) : null}
                            >
                                <i className="bi bi-chat-fill"></i>
                                <span>
                                    {post.commented || 'No'} {post.commented === 1 ? 'comment' : 'comments'}
                                </span>
                            </Link>
                        </div>
                        <div className="postFooterLikes">
                            <div
                                className="postLikesContainer"
                                onClick={
                                    (token && !itsMyPost && handleLikeClick) ||
                                    (itsMyPost ? () => handleNote(token, itsMyPost) : null) ||
                                    (!token ? () => handleNote(token, itsMyPost) : null)
                                }
                            >
                                <span>{likes}</span>
                                <i className="bi bi-heart-fill"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </article>
        </>
    );
}

export default Post;
