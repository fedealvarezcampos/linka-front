import './Post.css';

function Post() {
    return (
        <div className="postContainer">
            <div className="postInfo">
                <i class="ci-link_02"></i>
                <span className="postInfoText">
                    shared by <span>user</span> etc
                </span>
            </div>
            <div className="postContent">
                <h1>Title del post</h1>
                <p>Body del post</p>
            </div>
            <div className="postFooter">
                <div className="postFooterComments">
                    <i className="bi bi-chat-fill"></i>
                    <span>12 comments</span>
                </div>
                <div className="postFooterLikes">
                    <span>125</span>
                    <i className="bi bi-heart-fill"></i>
                </div>
            </div>
        </div>
    );
}

export default Post;
