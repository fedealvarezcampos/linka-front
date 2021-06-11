import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../api/users';
import { toast } from 'react-toastify';
import ProfileCard from './ProfileCard';
import '../styles/UserConfig.css';

function UserConfig({ setError, setLogNote }) {
    const dispatch = useDispatch();

    const user = useSelector(s => s.user);
    const isLoggedIn = useSelector(s => !!s.user);
    const username = useSelector(s => s.user?.username);
    const token = useSelector(s => s.user?.token);
    const preloadedImage = useSelector(s => s.user?.avatar);
    const defaultAvatar = 'http://localhost:8080/images/avatars/default.jpg';
    const userImage = `http://localhost:8080/images/avatars/${preloadedImage}`;

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [bio, setBio] = useState(user?.bio || '');
    const [userSite, setUserSite] = useState(user?.userSite || '');
    const [userTW, setUserTW] = useState(user?.userTW || '');
    const [userIG, setUserIG] = useState(user?.userIG || '');
    const [avatar, setAvatar] = useState();
    const [preview, setPreview] = useState();
    const [passVisibility, setPassVisibility] = useState();
    const [completed, setCompleted] = useState(false);

    if (!isLoggedIn) {
        return <Redirect to="/" />;
    }

    const notify = message => {
        setLogNote(true);
        toast.warn(message, {
            position: 'bottom-right',
            limit: '3',
        });
    };

    const notifySuccess = () => {
        setLogNote(true);
        toast.success('Data saved! 🍕', {
            position: 'bottom-right',
            limit: '3',
        });
    };

    console.log(completed);

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
            passVisibility && setPassVisibility(false);
            const response = await updateUser(username, fd, token);
            dispatch({ type: 'LOGIN', user: response });
            setCompleted(true);
            notifySuccess();
        } catch (error) {
            setError(error.response.data.error);
            notify(error.response.data.error);
        }
    };

    const handleFile = e => {
        const f = e.target.files[0];
        setAvatar(f);
        setPreview((f && URL.createObjectURL(f)) || defaultAvatar);
    };

    // if (completed) {
    //     return <Redirect to="/" />;
    // }

    return (
        <>
            <Helmet>
                <title>{`Settings | Linkah`}</title>
            </Helmet>
            <div className="userConfigPage">
                <div className="userConfigContainer">
                    <span>
                        profile | settings<i className="bi bi-file-person-fill"></i>
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div className="dataContainer">
                            <label>
                                <span>Change password</span>
                                <div className="passwordInput">
                                    <input
                                        placeholder="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type={passVisibility ? 'text' : 'password'}
                                    />
                                    <i
                                        onClick={() => setPassVisibility(!passVisibility)}
                                        className={
                                            passVisibility
                                                ? 'eyePass bi-eye-slash-fill'
                                                : 'eyePass bi-eye-fill'
                                        }
                                    ></i>
                                </div>
                            </label>
                            <label>
                                <span>Confirm new password</span>
                                <div className="passwordInput">
                                    <input
                                        placeholder="confirm password"
                                        value={confirmPass}
                                        onChange={e => setConfirmPass(e.target.value)}
                                        type={passVisibility ? 'text' : 'password'}
                                    />
                                    <i
                                        onClick={() => setPassVisibility(!passVisibility)}
                                        className={
                                            passVisibility
                                                ? 'eyePass bi-eye-slash-fill'
                                                : 'eyePass bi-eye-fill'
                                        }
                                    ></i>
                                </div>
                            </label>
                            <label>
                                <span>Bio</span>
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
                                <span>Site</span>
                                <br />
                                <input
                                    placeholder="your site url..."
                                    type="url"
                                    value={userSite}
                                    onChange={e => setUserSite(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Twitter</span>
                                <br />
                                <input
                                    placeholder="your Twitter profile..."
                                    type="url"
                                    value={userTW}
                                    onChange={e => setUserTW(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Instagram</span>
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
                            <i className="bi bi-camera2"></i>
                        </div>
                        <button className="button">SEND</button>
                    </form>
                </div>
                <ProfileCard user={user} />
            </div>
        </>
    );
}

export default UserConfig;
