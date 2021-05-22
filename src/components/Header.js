import { useState } from 'react';
import { useUser } from '../context/UserContext';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import NavProfile from './NavProfile.js';
import users from './users.json';
import './Header.css';

function Header({ modal, setModal }) {
    const user = useUser();
    const [error, setError] = useState();

    return (
        <>
            <header className="header">
                <div className="logo">LOGO</div>
                {user ? (
                    <NavProfile user={users} />
                ) : (
                    <div className="unloggedHead">
                        <button className="button">
                            <p>LOG IN</p>
                        </button>
                        <button className="button register" onClick={() => setModal(true)}>
                            <p>REGISTER</p>
                        </button>
                    </div>
                )}
            </header>
            {modal && (
                <Modal modal={modal} setModal={setModal} error={error} setError={setError}>
                    <RegisterForm setModal={setModal} setError={setError} />
                </Modal>
            )}{' '}
        </>
    );
}

export default Header;
