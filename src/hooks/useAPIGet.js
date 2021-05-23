import axios from 'axios';
import { useState, useEffect } from 'react';

function useAPIGet(url) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get(url).then(res => {
            const { data } = res;
            setResult(data);
        });
    }, [url]);

    return result;
}

export default useAPIGet;
