import { useState } from 'react';

function RegisterForm({ onLogin, setError, setAnimActive, animActive }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [data, setData] = useState();
    // const [completed, setCompleted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, confirmPass }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const result = await res.json();
            setData(result);
            onLogin(data);
        } else {
            const err = await res.json();
            setError(err);
        }
    };

    // if (completed) {
    // }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <br />
                <input
                    placeholder="user"
                    autoFocus
                    value={username}
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
                Confirm password
                <br />
                <input
                    placeholder="confirm pass"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    type="password"
                />
            </label>
            <br />
            <button className="button register">
                <p>REGISTER</p>
            </button>
        </form>
    );
}

export default RegisterForm;
