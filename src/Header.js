import { useState } from 'react';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import NavProfile from './NavProfile.js';
import users from './users.json';
import './Header.css';

function Header({ user, modal, setModal }) {
    return (
        <>
            <header className="header">
                <div className="logo">LOGO</div>
                {user ? (
                    <NavProfile user={users} />
                ) : (
                    <div className="unloggedHead">
                        <button className="button register" onClick={() => setModal(true)}>
                            <p>REGISTER</p>
                        </button>
                        <button className="button">
                            <p>LOG IN</p>
                        </button>
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
