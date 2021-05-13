import { useState } from 'react';

function RegisterForm({ defaultUser }) {
    const [username, setUsername] = useState(defaultUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Has hecho submit!', username, password);
        setCompleted(true);
    };

    if (completed) {
        return <div>Bienvenido, {username}!</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <br />
                <input placeholder="user" value={username} onChange={e => setUsername(e.target.value)} />
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
            <button className="registerButton">
                <p>REGISTER</p>
            </button>
        </form>
    );
}

export default RegisterForm;
