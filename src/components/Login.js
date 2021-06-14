import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notifyError } from '../helpers/toasts';
import { login } from '../api/users';
import '../styles/Login.css';

function Login({ error, setLogNote, setError, show, setShow, nodeRef }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVisibility, setPassVisibility] = useState('');
    const isLoggedIn = useSelector(s => !!s.user);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await login({
                email,
                password,
            });
            setShow(!show);
            setError('');
            passVisibility && setPassVisibility(false);
            dispatch({ type: 'LOGIN', user: response });
        } catch (error) {
            // setError(error.response.data.error);
            setLogNote(true);
            notifyError(error.response.data.error);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div ref={nodeRef} className="login dropMenu">
            <form onSubmit={handleSubmit}>
                <input placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <div className="passwordInput">
                    <input
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={passVisibility ? 'text' : 'password'}
                    />
                    <i
                        onClick={() => setPassVisibility(!passVisibility)}
                        className={passVisibility ? 'eyePass bi-eye-slash-fill' : 'eyePass bi-eye-fill'}
                    ></i>
                </div>
                {/* {error && <p className="loginError">{error}</p>} */}
                <button className="button">LOG IN</button>
            </form>
        </div>
    );
}

export default Login;
