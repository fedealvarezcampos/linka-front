import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSetUser, useUser } from '../context/UserContext';
import { login } from '../api/users';
import './Login.css';

function Login({ setError, nodeRef, setShow }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useUser();
    const setUser = useSetUser();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await login({
                email,
                password,
            });
            setShow(false);
            setUser(response);
            // setCompleted(true);
            // setModal(false);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div ref={nodeRef} className="login dropMenu">
            <form onSubmit={handleSubmit}>
                <input placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <input
                    placeholder="pass"
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
