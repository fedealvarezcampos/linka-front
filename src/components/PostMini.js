import { Link } from 'react-router-dom';
import '../styles/PostMini.css';

function PostMini({ post, user }) {
    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();

    const altPreview = `http://localhost:8080/images/prevLink.jpg`;

    return (
        <li className="miniPostContainer">
            <Link className="postContentLink" to={`/posts/${post.postId || post.id}/${postTitleURL}`}>
                <div className="miniPostContent">
                    <div>
                        <div
                            className="linkPrevImg"
                            style={{ backgroundImage: `url(${post.linkImg || altPreview})` }}
                            alt="link image"
                        />
                    </div>
                    <div className="miniPostData">
                        <span className="miniPostUsername">{post.username || user}</span>{' '}
                        <h1>{post.title.length > 19 ? post.title.slice(0, 19) + '...' : post.title}</h1>
                        <div className="miniPostFooter">
                            <span>{post.commented || '0'}</span>
                            <i className="bi bi-chat-fill"></i> <span>{post.likes || '0'}</span>
                            <i className="bi bi-heart-fill"></i>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default PostMini;
