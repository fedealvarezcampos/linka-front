import { useEffect } from 'react';
import { useModal, useSetModal } from '../context/ModalContext';

const useClosingKey = key => {
    const modal = useModal();
    const setModal = useSetModal();

    useEffect(() => {
        const f = e => {
            if (e.code === key) {
                setModal(false);
            }
        };
        window.addEventListener('keydown', f);
        return () => window.removeEventListener('keydown', f);
    }, [setModal, key]);

    return modal;
};

const useClosingLoginKey = (key, state, setState) => {
    useEffect(() => {
        const f = e => {
            if (e.code === key) {
                setState(false);
            }
        };
        window.addEventListener('keydown', f);
        return () => window.removeEventListener('keydown', f);
    }, [setState, key]);

    return state;
};

export { useClosingKey, useClosingLoginKey };
