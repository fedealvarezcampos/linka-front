import './LinkPreview.css';

function LinkPreview({ post }) {
    return (
        <a className="linkPrevContainer" target="_blank" rel="noreferrer" href={post.link}>
            <div
                className="linkPrevImg"
                style={{ backgroundImage: `url(${post.linkImg})` }}
                alt="link image"
            />
            <div className="linkInfoContainer">
                <p className="linkPrevTitle">{post.linkTitle}</p>
                <p className="linkPrevDesc">{post.linkDesc}</p>
            </div>
        </a>
    );
}

export default LinkPreview;
