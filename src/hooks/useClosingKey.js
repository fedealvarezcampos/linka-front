import { useEffect } from 'react';

const useClosingKey = (key, state, setState) => {
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

export { useClosingKey };
