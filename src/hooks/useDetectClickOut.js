import { useEffect, useRef, useState } from 'react';

function useDetectClickOut(initState) {
    const nodeRef = useRef(null);

    const [show, setShow] = useState(initState);
    const handleClickOutside = event => {
        if (nodeRef.current && !nodeRef.current.contains(event.target)) {
            return setShow(false);
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
