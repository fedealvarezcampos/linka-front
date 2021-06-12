import { useSelector } from 'react-redux';
import { animated } from 'react-spring';
import { useClosingKey } from '../hooks/useClosingKey';
import { useModal, useSetModal } from '../context/ModalContext';
import { useFadeAnimation, useSlideAnimation } from '../assets/anime';
import '../styles/Modal.css';

function Modal({ children, error, setError, postId, handleDeleteClick }) {
    const token = useSelector(s => s.user?.token);
    const modal = useModal();
    const setModal = useSetModal();
    const fadeAnime = useFadeAnimation();
    const slideAnime = useSlideAnimation();

    const handleModalReset = () => {
        setModal(!modal);
        setError();
    };

    // useClosingKey('Escape');
    useClosingKey('Escape', modal, setModal);

    return (
        <div className="modal-container">
            {modal && !token && (
                <>
                    <animated.div style={fadeAnime} className="modal-fg">
                        {children}
                    </animated.div>
                    <div className="modal-bg" onClick={handleModalReset}></div>
                </>
            )}
            {error && (
                <animated.div style={slideAnime} className="errorMsg">
                    {error}
                </animated.div>
            )}
            {modal && token && (
                <>
                    <div className="modal-fg deletePostModal bounceAnim">
                        <span>You really want to erase this?</span>
                        <button onClick={handleDeleteClick} className="button deletePostButton">
                            I really do
                        </button>
                    </div>

                    <div className="modal-bg" onClick={() => setModal(false)}></div>
                </>
            )}
            {/* {!error && <div className="errorMsg hidden"></div>} */}
        </div>
    );
}

export default Modal;
