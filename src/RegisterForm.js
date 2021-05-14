import { useState } from 'react';
import Button from './Button';

function RegisterForm({ defaultUser, onLogin }) {
    const [username, setUsername] = useState(defaultUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [status, setStatus] = useState();
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/api/users', {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({ username, email, password, confirmPass }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const data = await res.json();
            setStatus();
            onLogin(data);
        } else {
            setStatus('error');
        }
    };

    if (completed) {
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <br />
                <input
                    placeholder="user"
                    value={username}
                    autoFocus
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                E-Mail
                <br />
                <input placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password
                <br />
                <input
                    placeholder="pass"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
            </label>
            <br />
            <label>
                Confirm pass
                <br />
                <input
                    placeholder="confirm pass"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    type="password"
                />
            </label>
            <br />
            <Button>REGISTER</Button>
        </form>
    );
}

export default RegisterForm;
