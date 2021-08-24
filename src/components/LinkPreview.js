import '../styles/LinkPreview.css';

function LinkPreview({ post, notify }) {
    const { REACT_APP_SERVER: baseURL } = process.env;

    const altPreview = `${baseURL}images/prevLink.jpg`;

    return (
        <div
            className="linkPrevContainer"
            target="_blank"
            rel="noreferrer"
            onClick={() => window.open(post.link, '_blank')}
        >
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
            <div className="linkInfoContainer">
                <p className="linkPrevTitle">
                    {(!post?.linkTitle?.includes('Login') && post.linkTitle) ||
                        (post?.linkTitle?.includes('Login') && 'Check the link!')}
                </p>
                <p className="linkPrevDesc">{post.linkDesc.slice(0, 110) + '...'}</p>
            </div>
        </div>
    );
}

export default LinkPreview;
