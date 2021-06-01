import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LinkPreview from './LinkPreview';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useGetSinglePost } from '../api/posts';
import '../styles/SinglePostPage.css';
import '../styles/Post.css';

function SinglePostPage({ user, setError }) {
    const token = useSelector(s => s.user?.token);
    const username = useSelector(s => s.username);
    const { postId } = useParams();
    const post = useGetSinglePost(postId, token);
    console.log(post);

    return (
        post && (
            <div className="postContainer singlePostContainer">
                <div className="postInfo">
                    <i className="ci-link_02"></i>
                    <span className="postInfoText">
                        shared by{' '}
                        <span>
                            <Link to={`/users/${post.username || user}`}>{post.username || user}</Link>
                        </span>{' '}
                        on {new Date(post.created_date).toLocaleString()}
                    </span>
                </div>
                <div className="postContent">
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <LinkPreview post={post} />
                    <hr />
                    <div className="postFooter">
                        <div className="postFooterComments">
                            <i className="bi bi-chat-fill"></i>
                            <span>
                                {post.commented || '0'} {post.commented === 1 ? 'comment' : 'comments'}
                            </span>
                        </div>
                        <div className="postFooterLikes">
                            <span>{post.likes || '0'}</span>
                            <i className="bi bi-heart-fill"></i>
                        </div>
                    </div>
                    <CommentForm id={postId} setError={setError} />
                    <hr />
                    <CommentList id={postId} />
                </div>
            </div>
        )
    );
}

export default SinglePostPage;
