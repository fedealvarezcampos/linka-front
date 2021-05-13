import './Modal.css';

function Modal({ children }) {
    return (
        <div className="modal-bg">
            <div className="modal-fg">{children}</div>
        </div>
    );
}

export default Modal;
