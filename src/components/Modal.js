import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Modal.css';

function Modal({ children, modal, setModal, error, setError }) {
    const fadeNoResetANM = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
    const slideInANM = useSpring({
        config: {
            tension: 3000,
            friction: 35,
        },
        from: { x: -35, opacity: 0 },
        to: { x: 0, opacity: 1 },
        reset: true,
    });

    const handleModalReset = () => {
        setModal(false);
        setError();
    };

    return (
        <div className="modal-container" onKeyDown={e => e.key === 'Escape' && handleModalReset()}>
            {modal && (
                <>
                    <animated.div style={fadeNoResetANM} className="modal-fg">
                        {children}
                    </animated.div>
                    <div className="modal-bg" onClick={handleModalReset}></div>
                </>
            )}
            {error && (
                <animated.div style={slideInANM} className="errorMsg">
                    {error.error}
                </animated.div>
            )}
            {!error && <div className="errorMsg hidden"></div>}
        </div>
    );
}

export default Modal;
