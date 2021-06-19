import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyAuth } from '../helpers/toasts';
import '../styles/PostMini.css';

function PostMini({ post, user }) {
    const setLogNote = useSetLogNote();
    const token = useSelector(s => s.user?.token);

    const postTitleURL = post.title.replaceAll(' ', '-').toLowerCase();
    const altPreview = `https://linkah.vercel.app/images/prevLink.jpg`;

    const handleNote = token => {
        setLogNote(true);
        notifyAuth(token);
    };

    return (
        <li className="miniPostContainer">
            <Link
                className="postContentLink"
                to={(token && `/posts/${post.postId || post.id}/${postTitleURL}`) || (!token && '/')}
                onClick={() => handleNote(token)}
            >
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
                        <h1>{post.title.length > 25 ? post.title.slice(0, 25) + '...' : post.title}</h1>
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
