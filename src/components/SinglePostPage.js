import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';
import { useGetSinglePost, likePost } from '../api/posts';
import { useGetComments } from '../api/comments';
import Spinner from '../assets/Spinner';
import LinkPreview from './LinkPreview';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import '../styles/SinglePostPage.css';
import '../styles/Post.css';

function SinglePostPage({ setError, setLogNote }) {
    const { postId } = useParams();

    const user = useSelector(s => s?.user);
    const token = useSelector(s => s.user?.token);

    const commentsData = useGetComments(postId);
    const post = useGetSinglePost(postId, token);
    const itsMyPost = user?.id === post?.userId;
    console.log(itsMyPost);

    const postLikes = post?.likes;
    console.log(postLikes);

    const [likes, setLikes] = useState(postLikes);
    // console.log(likes);
    const [commentList, setCommentList] = useState([]);

    // console.log(likes);

    // console.log(commentList);
    // console.log(commentsData);

    if (!post) {
        return <Spinner />;
    }

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
        toast.error('Liking your posts is not cool 🦂', {
            position: 'bottom-right',
            limit: '3',
        });
    };

    return (
        post && (
            <div className="postContainer singlePostContainer">
                <div className="postInfo">
                    <i className="ci-link_02"></i>
                    <span className="postInfoText">
                        shared by{' '}
                        <span>
                            <Link to={`/users/${post.username}`}>{post.username}</Link>
                        </span>{' '}
                        <ReactTimeAgo date={new Date(post.created_date)} locale="en-US" />
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
                        <div
                            className="postFooterLikes"
                            onClick={(token && !itsMyPost && handleLikeClick) || (itsMyPost && notify)}
                        >
                            <div className="postLikesContainer">
                                <span>{likes}</span>
                                <i className="bi bi-heart-fill"></i>
                            </div>
                        </div>
                    </div>
                    <CommentForm
                        commentList={commentList}
                        setCommentList={setCommentList}
                        id={postId}
                        setError={setError}
                    />
                    <hr />
                    {commentList?.length !== 0 || commentsData?.length !== 0 ? (
                        <CommentList commentsData={commentsData} commentList={commentList} id={postId} />
                    ) : (
                        <div className="noCommentsHere">No hay comentarios</div>
                    )}
                </div>
            </div>
        )
    );
}

export default SinglePostPage;
