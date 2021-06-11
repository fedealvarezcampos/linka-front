import { useEffect, useRef, useState } from 'react';

function useDetectClickOut(initState, setError) {
    const nodeRef = useRef(null);

    const [show, setShow] = useState(initState);

    const handleClickOutside = e => {
        if (nodeRef.current && !nodeRef.current.contains(e.target)) {
            setError('');
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

function useDetectClickOutActivity(initState) {
    const nodeRefAct = useRef(null);

    const [activityMenu, setActivityMenu] = useState(initState);

    const handleClickOutside = e => {
        if (nodeRefAct.current && !nodeRefAct.current.contains(e.target)) {
            return setActivityMenu(!activityMenu);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
    return {
        nodeRefAct,
        activityMenu,
        setActivityMenu,
    };
}

export { useDetectClickOut, useDetectClickOutActivity };
