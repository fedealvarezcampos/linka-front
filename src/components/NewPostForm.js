import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { publishLink } from '../api/posts';
import ProfileCard from './ProfileCard';
import '../styles/NewPostForm.css';

function UserConfig({ setError }) {
    const user = useSelector(s => s.user);
    const token = useSelector(s => s.user?.token);

    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await publishLink(token, {
                link,
                title,
                description,
            });
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <>
            <Helmet>
                <title>{`New link | Linkah`}</title>
            </Helmet>
            <div className="userConfigPage">
                <div className="userConfigContainer">
                    <span>
                        profile | settings<i className="bi bi-file-person-fill"></i>
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div className="dataContainer">
                            <label>
                                Link
                                <br />
                                <input
                                    placeholder="share your link here..."
                                    type="url"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                />
                            </label>
                            <label>
                                Title
                                <br />
                                <input
                                    placeholder="share your link here..."
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                Bio
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

export default UserConfig;
