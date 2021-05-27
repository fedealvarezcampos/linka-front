import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../api/users';
import './UserConfig.css';

function UserConfig({ setError }) {
    const { username } = useParams();
    const token = useSelector(s => s.user?.token);
    const preloadedImage = useSelector(s => s.user.avatar);
    const userImage = `http://localhost:3001/images/avatars/${preloadedImage}`;
    // const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg';

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [bio, setBio] = useState('');
    const [userSite, setUserSite] = useState('');
    const [userTW, setUserTW] = useState('');
    const [userIG, setUserIG] = useState('');
    const [avatar, setAvatar] = useState();
    const [preview, setPreview] = useState();

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const fd = new FormData();
            fd.append('password', password);
            fd.append('confirmPass', confirmPass);
            fd.append('bio', bio);
            fd.append('userSite', userSite);
            fd.append('userTW', userTW);
            fd.append('userIG', userIG);
            fd.append('avatar', avatar);

            await updateUser(username, fd, token);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleFile = e => {
        const f = e.target.files[0];
        setAvatar(f);
        setPreview(URL.createObjectURL(f));
    };

    return (
        <>
            <div className="userConfigPage">
                <div className="userConfigContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="dataContainer">
                            <label>
                                Password
                                <br />
                                <input
                                    placeholder="password"
                                    autoFocus
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                            </label>
                            <label>
                                Confirm password
                                <br />
                                <input
                                    placeholder="confirm pass"
                                    value={confirmPass}
                                    onChange={e => setConfirmPass(e.target.value)}
                                    type="password"
                                />
                            </label>
                            <label>
                                Bio
                                <br />
                                <textarea
                                    cols="35"
                                    rows="6"
                                    placeholder="bio"
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    type="text"
                                />
                            </label>
                            <label>
                                Site
                                <br />
                                <input
                                    placeholder="your site url..."
                                    type="url"
                                    value={userSite}
                                    onChange={e => setUserSite(e.target.value)}
                                />
                            </label>
                            <label>
                                Twitter
                                <br />
                                <input
                                    placeholder="your Twitter profile..."
                                    type="url"
                                    value={userTW}
                                    onChange={e => setUserTW(e.target.value)}
                                />
                            </label>
                            <label>
                                Instagram
                                <br />
                                <input
                                    placeholder="your Instagram profile..."
                                    type="url"
                                    value={userIG}
                                    onChange={e => setUserIG(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="avatarContainer">
                            <label className="avatarConfig">
                                <div
                                    className="avatar"
                                    style={
                                        (preview && { backgroundImage: `url(${preview})` }) || {
                                            backgroundImage: `url(${userImage})`,
                                        }
                                    }
                                />
                                <input onChange={handleFile} type="file" />
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
