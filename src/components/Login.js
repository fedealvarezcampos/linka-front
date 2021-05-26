import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../api/users';
import './Login.css';

function Login({ setError, nodeRef, setShow }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useSelector(s => !!s.user);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await login({
                email,
                password,
            });
            setShow(false);
            dispatch({ type: 'LOGIN', user: response });
        } catch (error) {
            setError(error.response.data.error);
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
                <input
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <button className="button">LOG IN</button>
            </form>
        </div>
    );
}

export default Login;
