import { useSelector } from 'react-redux';
import { useClosingKey } from '../hooks/useClosingKey';
import { useModal, useSetModal } from '../context/ModalContext';
import '../styles/Modal.css';

function Modal({ children, setError, username, deleteUser, handleDeleteClick }) {
    const token = useSelector(s => s.user?.token);
    const modal = useModal();
    const setModal = useSetModal();

    const handleModalReset = () => {
        setModal(!modal);
        setError();
    };

    useClosingKey('Escape', modal, setModal);

    return (
        <div className="modal-container">
            {modal && !token && (
                <>
                    <div className="modal-fg fadeInto">{children}</div>
                    <div className="modal-bg fadeInto" onClick={handleModalReset}></div>
                </>
            )}
            {modal && token && (
                <>
                    {!username && (
                        <div className="modal-fg deletePostModal bounceAnim">
                            <span>You really want to erase this?</span>
                            <button onClick={handleDeleteClick} className="button deletePostButton">
                                DELETE IT
                            </button>
                        </div>
                    )}
                    {username && (
                        <div className="modal-fg deletePostModal bounceAnim">
                            <span>Leaving already?</span>
                            <br />
                            <span>(Account will be terminated)</span>
                            <button onClick={deleteUser} className="button deletePostButton">
                                I'M OUT
                            </button>
                        </div>
                    )}

                    <div className="modal-bg" onClick={() => setModal(false)}></div>
                </>
            )}
        </div>
    );
}

export default Modal;
