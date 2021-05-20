import LinkPreview from './LinkPreview';
import './Post.css';

function Post({ post }) {
    const postDate = new Date(post.created_date).toLocaleString();
    console.log(postDate.toLocaleString());

    return (
        <li className="postContainer">
            <div className="postInfo">
                <i className="ci-link_02"></i>
                <span className="postInfoText">
                    shared by <span>{post.username}</span> on {postDate}
                </span>
            </div>
            <div className="postContent">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <LinkPreview post={post} />
            </div>
            <div className="postFooter">
                <div className="postFooterComments">
                    <i className="bi bi-chat-fill"></i>
                    <span>{post.commented || '0'} comments</span>
                </div>
                <div className="postFooterLikes">
                    <span>{post.likes || '0'}</span>
                    <i className="bi bi-heart-fill"></i>
                </div>
            </div>
        </li>
    );
}

export default Post;
