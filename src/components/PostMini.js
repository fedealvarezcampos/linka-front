import { Link } from 'react-router-dom';
import '../styles/PostMini.css';

function PostMini({ post, user }) {
    // console.log(post);

    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();

    return (
        <li className="miniPostContainer">
            <div className="miniPostContent">
                <div>
                    <Link className="postContentLink" to={`/posts/${post.postId || post.id}/${postTitleURL}`}>
                        <div
                            className="linkPrevImg"
                            style={{ backgroundImage: `url(${post.linkImg})` }}
                            alt="link image"
                        />
                    </Link>
                </div>
                <div className="miniPostData">
                    <span className="miniPostUsername">
                        <Link to={`/users/${post.username || user}`}>{post.username || user}</Link>
                    </span>{' '}
                    <Link className="postContentLink" to={`/posts/${post.postId || post.id}/${postTitleURL}`}>
                        <h1>{post.title.length > 19 ? post.title.slice(0, 19) + '...' : post.title}</h1>
                    </Link>
                    <div className="miniPostFooter">
                        <span>{post.commented || '0'}</span>
                        <i className="bi bi-chat-fill"></i> <span>{post.likes || '0'}</span>
                        <i className="bi bi-heart-fill"></i>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default PostMini;
