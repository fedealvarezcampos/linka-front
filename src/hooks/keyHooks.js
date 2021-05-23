import { useEffect } from 'react';
import { useModal, useSetModal } from '../context/ModalContext';

const useClosingKey = key => {
    const modal = useModal();
    const setModal = useSetModal();

    useEffect(() => {
        const f = e => {
            if (e.code === 'Escape') {
                setModal(false);
            }
        };
        window.addEventListener('keydown', f);
        return () => window.removeEventListener('keydown', f);
    }, [setModal]);

    return modal;
};

export { useClosingKey };
