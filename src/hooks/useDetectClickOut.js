import { useEffect, useRef, useState } from 'react';

function useDetectClickOut(initState) {
    const nodeRef = useRef(null);

    const [show, setShow] = useState(initState);
    const handleClickOutside = e => {
        if (nodeRef.current && !nodeRef.current.contains(e.target)) {
            return setShow(!show);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
    return {
        nodeRef,
        show,
        setShow,
    };
}

export { useDetectClickOut };
