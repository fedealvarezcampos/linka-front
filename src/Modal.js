import { useState } from 'react';
import './Modal.css';

function Modal({ children }) {
    const [n, setN] = useState(true);

    const handleAnswerChange = e => {
        if (e.key === 'Escape') {
            setN(n ? '' : 'hidden');
        }
    };

    return (
        <div className={n ? 'modal-container' : 'hidden'} onKeyDown={handleAnswerChange}>
            <div className="modal-fg">{children}</div>
            <div className="modal-bg" onClick={() => setN(n ? '' : 'hidden')}></div>
        </div>
    );
}

export default Modal;
