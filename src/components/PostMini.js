import { Link } from 'react-router-dom';
import LinkPreview from './LinkPreview';
import '../styles/PostMini.css';

function PostMini({ post, user }) {
    // console.log(post);

    const postDate = new Date(post.created_date).toLocaleString();
    return (
        <li className="miniPostContainer">
            <div className="miniPostContent">
                <div>
                    <div
                        className="linkPrevImg"
                        style={{ backgroundImage: `url(${post.linkImg})` }}
                        alt="link image"
                    />
                </div>
                <div className="miniPostData">
                    <span className="miniPostUsername">
                        <Link to={`/users/${post.username || user}`}>{post.username || user}</Link>
                    </span>{' '}
                    <Link className="postContentLink" to={`/posts/${post.postId || post.id}`}>
                        <h1>{post.title}</h1>
                    </Link>
                    <div className="miniPostFooter">
                        <i className="bi bi-chat-fill"></i>
                        <span>
                            {post.commented || '0'} {post.commented === 1 ? 'comment' : 'comments'}
                        </span>
                        {' | '}
                        <span>{post.likes || '0'}</span>
                        <i className="bi bi-heart-fill"></i>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default PostMini;
