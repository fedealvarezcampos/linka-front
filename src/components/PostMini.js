import { Link } from 'react-router-dom';
import '../styles/PostMini.css';

function PostMini({ post, user }) {
    const { REACT_APP_SERVER: baseURL } = process.env;

    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();
    const altPreview = `${baseURL}images/prevLink.jpg`;

    return (
        <li className="miniPostContainer">
            <Link className="postContentLink" to={`/posts/${post.postId || post.id}/${postTitleURL}`}>
                <div className="miniPostContent">
                    <div>
                        <div
                            className="linkPrevImg"
                            style={{
                                backgroundImage: `url(${
                                    (!post?.linkImg?.includes('scontent') && post.linkImg) ||
                                    (post?.linkImg?.includes('scontent') && altPreview) ||
                                    altPreview
                                })`,
                            }}
                            alt="link image"
                        />
                    </div>
                    <div className="miniPostData">
                        <span className="miniPostUsername">{post.username || user}</span>{' '}
                        <h1>{post.title.length > 28 ? post.title.slice(0, 28) + '...' : post.title}</h1>
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
