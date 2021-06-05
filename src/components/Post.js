import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { likePost } from '../api/posts';
import LinkPreview from './LinkPreview';
import '../styles/Post.css';

function Post({ post, user, setError }) {
    // console.log(post);

    const [likes, setLikes] = useState(post.likes || 0);

    const token = useSelector(s => s.user?.token);
    const postId = post.postId || post.id;
    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();

    let body;

    const handleLikeClick = async e => {
        e.preventDefault();
        try {
            const response = await likePost(postId, body, token);
            console.log(response.likeId);
            response.likeId !== null ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const postDate = new Date(post.created_date);

    return (
        <li className="postContainer">
            <div className="postInfo">
                <i className="ci-link_02"></i>
                <span className="postInfoText">
                    shared by{' '}
                    <span>
                        <Link to={`/users/${post.username || user}`}>{post.username || user}</Link>
                    </span>{' '}
                    <ReactTimeAgo date={postDate} locale="en-US" />
                </span>
            </div>
            <div className="postContent">
                <Link className="postContentLink" to={`/posts/${postId}/${postTitleURL}`}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </Link>
                <LinkPreview post={post} />
            </div>
            <div className="postFooter">
                <div className="postFooterComments">
                    <i className="bi bi-chat-fill"></i>
                    <span>
                        {post.commented || '0'} {post.commented === 1 ? 'comment' : 'comments'}
                    </span>
                </div>
                <div className="postFooterLikes" onClick={handleLikeClick}>
                    <div className="postLikesContainer">
                        <span>{likes}</span>
                        <i className="bi bi-heart-fill"></i>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Post;
