import { useState } from 'react';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import NavProfile from './NavProfile.js';
import users from './users.json';
import './Header.css';

function Header({ user, setUser, modal, setModal }) {
    return (
        <>
            <header className="header">
                <div className="logo">LOGO</div>
                {user ? (
                    <NavProfile user={users} />
                ) : (
                    <div>
                        <button className="button register" onClick={() => setModal(true)}>
                            REGISTER
                        </button>
                        <button className="button">LOGIN</button>
                    </div>
                )}
            </header>
            {modal && (
                <Modal modal={modal} setModal={setModal}>
                    <RegisterForm />
                </Modal>
            )}
        </>
    );
}

export default Header;
