import { useEffect } from 'react';

const useEscapingKey = (modal, setModal) => {
    useEffect(() => {
        const f = e => {
            if (e.code === 'Escape') {
                setModal(false);
            }
        };
        window.addEventListener('keydown', f);
        return window.removeEventListener('keydown', f);
    }, [setModal]);

    return modal;
};

export default useEscapingKey;
