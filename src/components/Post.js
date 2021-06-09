import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { ToastContainer, toast } from 'react-toastify';
import { likePost } from '../api/posts';
import LinkPreview from './LinkPreview';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Post.css';

function Post({ post, username, setError, setLogNote }) {
    // console.log(post);

    const user = useSelector(s => s?.user);
    const itsMyPost = user?.id === (post.userId || post.userId);

    const [likes, setLikes] = useState(post?.likes || 0);

    const token = useSelector(s => s.user?.token);
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

    const notify = () => {
        setLogNote(true);
        toast.error(
            (!token && 'Log in to do that! 🍕') || (itsMyPost && 'Liking your posts is not cool 🦂'),
            {
                position: 'bottom-right',
                limit: '3',
            }
        );
    };

    const postDate = new Date(post.created_date);

    return (
        <>
            <li className="postContainer">
                <div className="postInfo">
                    <i className="ci-link_02"></i>
                    <span className="postInfoText">
                        shared by{' '}
                        <span>
                            <Link to={`/users/${post.username || username}`}>
                                {post.username || username}
                            </Link>
                        </span>{' '}
                        <ReactTimeAgo date={postDate} locale="en-US" />
                    </span>
                </div>
                <div className="postContent">
                    <Link
                        className="postContentLink"
                        to={token ? `/posts/${postId}/${postTitleURL}` : `/`}
                        onClick={!token && notify}
                    >
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <LinkPreview post={post} />
                    </Link>
                </div>
                <div className="postFooter">
                    <div className="postFooterComments">
                        <i className="bi bi-chat-fill"></i>
                        <span>
                            {post.commented || '0'} {post.commented === 1 ? 'comment' : 'comments'}
                        </span>
                    </div>
                    <div
                        className="postFooterLikes"
                        onClick={(token && !itsMyPost && handleLikeClick) || notify || (itsMyPost && notify)}
                    >
                        <div className="postLikesContainer">
                            <span>{likes}</span>
                            <i className="bi bi-heart-fill"></i>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Post;
