import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { register } from '../api/users';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError, notifyMessage } from '../helpers/toasts';

function RegisterForm({ modal, setModal }) {
    const setLogNote = useSetLogNote();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register({ username, email, password, confirmPass });
            setLogNote(true);
            notifyMessage('Check your email to verify your account!');
            setCompleted(true);
            setModal(!modal);
        } catch (error) {
            // setError(error.response.data.error);
            setLogNote(true);
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
