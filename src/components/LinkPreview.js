import { animated } from 'react-spring';
import { useState } from 'react';
import { useHoverAnimation } from '../resource/anime';
import './LinkPreview.css';

function LinkPreview({ post }) {
    const [hover, setHover] = useState();

    return (
        <animated.a
            style={useHoverAnimation(hover)}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
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
        </animated.a>
    );
}

export default LinkPreview;
