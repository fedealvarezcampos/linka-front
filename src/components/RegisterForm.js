import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { register } from '../api/users';
import { notifyError, notifyMessage } from '../helpers/toasts';

function RegisterForm({ setLogNote, modal, setModal }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register({ username, email, password, confirmPass });
            setModal(!modal);
            setLogNote(true);
            notifyMessage('Check your email to verify your account!');
            setCompleted(true);
        } catch (error) {
            // setError(error.response.data.error);
            setLogNote(true);
            console.log(error.response);
            error.response && notifyError(error.response.data.error);
        }
    };

    if (completed) {
        return <Redirect to="/" />;
    }

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
