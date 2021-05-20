import { useState } from 'react';
import './Login.css';
import { useSetUser } from './UserContext';

function LoginModal({ setSignup, closeModal }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSetUser();

    const handleLogin = async e => {
        e.preventDefault();
        const res = await fetch('http://poi-api.trek-quest.com/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data);
            closeModal();
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <label>
                Usuario:
                <input name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button>Iniciar sesión</button>
            <p>
                Aún no tienes cuenta?
                <button type="button" onClick={() => setSignup(true)}>
                    Regístrate
                </button>
            </p>
        </form>
    );
}

export default LoginModal;
