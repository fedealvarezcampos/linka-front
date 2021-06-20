import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NoResultsPost = () => {
    const [catGIF, setCatGIF] = useState();

    useEffect(() => {
        setCatGIF('https://cataas.com/cat/gif');
    }, [catGIF]);

    return (
        <ul className="postListContainer noResults">
            <li className="postContainer noResults">
                <div className="postInfo noResults">
                    <span className="postInfoText noResults">
                        <i className="bi bi-slash-circle-fill" />
                        no results
                    </span>
                </div>
                <div className="postContent noResults">
                    <div>Nothing but a gif of a cat</div>
                    <div
                        className="catGif"
                        style={{
                            backgroundImage: `url(${catGIF})`,
                        }}
                        alt="cat gif"
                    />
                    <Link to="/">
                        <button className="button">Go home</button>
                    </Link>
                </div>
            </li>
        </ul>
    );
};

export default NoResultsPost;
