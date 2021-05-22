import { useEffect } from 'react';
import { animated } from 'react-spring';
import { useFadeAnimation, useSlideAnimation } from '../resource/anime';
import './Modal.css';

function Modal({ children, modal, setModal, error, setError }) {
    const fadeAnime = useFadeAnimation();
    const slideAnime = useSlideAnimation();

    const handleModalReset = () => {
        setModal(false);
        setError();
    };

    useEffect(() => {
        const f = e => {
            if (e.code === 'Escape') {
                setModal(false);
            }
        };
        window.addEventListener('keydown', f);
        return () => window.removeEventListener('keydown', f);
    }, [setModal]);

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
