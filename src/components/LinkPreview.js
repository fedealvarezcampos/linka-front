import { useSelector } from 'react-redux';
import '../styles/LinkPreview.css';

function LinkPreview({ post, notify }) {
    const { REACT_APP_BASEURL: baseURL } = process.env;

    const token = useSelector(s => s.user?.token);

    const altPreview = `${baseURL}images/prevLink.jpg`;

    return (
        <div
            className="linkPrevContainer"
            target="_blank"
            rel="noreferrer"
            onClick={!token ? () => notify() : () => window.open(post.link, '_blank')}
        >
            <div
                className="linkPrevImg"
                style={{
                    backgroundImage: `url(${
                        (!post?.linkImg.includes('scontent') && post.linkImg) ||
                        (post?.linkImg.includes('scontent') && altPreview) ||
                        altPreview
                    })`,
                }}
                alt="link image"
            />
            <div className="linkInfoContainer">
                <p className="linkPrevTitle">{post.linkTitle}</p>
                <p className="linkPrevDesc">{post.linkDesc.slice(0, 110) + '...'}</p>
            </div>
        </div>
    );
}

export default LinkPreview;
