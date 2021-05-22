import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSetUser, useUser } from './UserContext';
import { login } from '../api/users';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useUser();
    const setUser = useSetUser();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = login({ username, password });
            setUser(data);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>Log in</button>
            </form>
        </div>
    );
}

export default Login;
