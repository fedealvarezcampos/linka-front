import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSinglePost } from '../api/posts';
import { useGetComments } from '../api/comments';
import LinkPreview from './LinkPreview';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import '../styles/SinglePostPage.css';
import '../styles/Post.css';

function SinglePostPage({ user, setError }) {
    const { postId } = useParams();

    const token = useSelector(s => s.user?.token);

    const commentsData = useGetComments(postId);
    const post = useGetSinglePost(postId, token);

    const [commentList, setCommentList] = useState([]);

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
                    <CommentForm
                        commentList={commentList}
                        setCommentList={setCommentList}
                        id={postId}
                        setError={setError}
                    />
                    <hr />
                    <CommentList commentsData={commentsData} commentList={commentList} id={postId} />
                </div>
            </div>
        )
    );
}

export default SinglePostPage;
