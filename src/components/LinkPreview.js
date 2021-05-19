import './LinkPreview.css';

function LinkPreview({ post }) {
    return (
        <div className="linkPrevContainer">
            <div
                className="linkPrevImg"
                style={{ backgroundImage: `url(${post.linkImg})` }}
                alt="link image"
            />
            <div className="linkInfoContainer">
                <p className="linkPrevTitle">{post.linkTitle}</p>
                <p className="linkPrevDesc">{post.linkDesc}</p>
            </div>
        </div>
    );
}

export default LinkPreview;
