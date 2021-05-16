import { useState } from 'react';
import './Modal.css';

function Modal({ children, modal, setModal, error }) {
    return (
        <div
            className="modal-container"
            onKeyDown={e => {
                if (e.key === 'Escape') {
                    setModal(false);
                }
            }}
        >
            {modal && (
                <>
                    <div className="modal-fg">{children}</div>
                    <div className="modal-bg" onClick={() => setModal(false)}></div>
                </>
            )}
            {error && <div className="errorMsg bounceAnim">{error.error}</div>}
            {!error && <div className="errorMsg hidden"></div>}
        </div>
    );
}

export default Modal;
