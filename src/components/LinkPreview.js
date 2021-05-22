import { animated } from 'react-spring';
import { useState } from 'react';
// import { useHoverAnimation } from '../resource/anime';
import './LinkPreview.css';

function LinkPreview({ post }) {
    const [hover, setHover] = useState();
    const [active, setActive] = useState();

    return (
        <a
            // style={useHoverAnimation(hover, active)}
            // onMouseOver={() => setHover(true)}
            // onMouseOut={() => setHover(false)}
            // onClick={() => setActive(true)}
            className="linkPrevContainer"
            href={post.link}
        >
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
