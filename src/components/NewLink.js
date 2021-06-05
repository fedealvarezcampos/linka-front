import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { publishLink } from '../api/posts';
import '../styles/NewLink.css';

function NewLink({ setError }) {
    const token = useSelector(s => s.user?.token);

    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [post, setPost] = useState();
    const [posted, setPosted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await publishLink({ link, title, description }, token);
            setPost(response);
            setPosted(true);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const postTitleURL = post && post.title.replaceAll(' ', '-').toLowerCase();

    console.log(post);
    if (posted) {
        return <Redirect to={`/posts/${post.id}/${postTitleURL}`} />;
    }

    return (
        <>
            <Helmet>
                <title>{`New link | Linkah`}</title>
            </Helmet>
            <div className="newLinkPage">
                <div className="newLinkContainer">
                    <span>
                        profile | settings<i className="bi bi-file-person-fill"></i>
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div className="dataContainer">
                            <label>
                                <span>Link</span>
                                <br />
                                <input
                                    placeholder="share your link here..."
                                    type="url"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Title</span>
                                <br />
                                <input
                                    placeholder="share your link here..."
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Description</span>
                                <br />
                                <textarea
                                    cols="35"
                                    rows="6"
                                    placeholder="bio"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    type="text"
                                />
                            </label>
                        </div>

                        <button className="button">SEND</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewLink;
