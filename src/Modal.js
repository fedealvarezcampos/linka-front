import { useState } from 'react';
import './Modal.css';

function Modal({ children }) {
    const [n, setN] = useState(true);

    return (
        <div className={n ? 'modal-container' : 'hidden'}>
            <div className="modal-fg">{children}</div>
            <div className="modal-bg" onClick={() => setN(n ? '' : 'hidden')}></div>
        </div>
    );
}

export default Modal;
