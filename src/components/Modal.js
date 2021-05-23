import { useClosingKey } from '../hooks/useClosingKey';
import { useModal, useSetModal } from '../context/ModalContext';
import { animated } from 'react-spring';
import { useFadeAnimation, useSlideAnimation } from '../assets/anime';
import './Modal.css';

function Modal({ children, error, setError }) {
    const modal = useModal();
    const setModal = useSetModal();
    const fadeAnime = useFadeAnimation();
    const slideAnime = useSlideAnimation();

    const handleModalReset = () => {
        setModal(false);
        setError();
    };

    useClosingKey('Escape');

    return (
        <div className="modal-container">
            {modal && (
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
            {!error && <div className="errorMsg hidden"></div>}
        </div>
    );
}

export default Modal;
