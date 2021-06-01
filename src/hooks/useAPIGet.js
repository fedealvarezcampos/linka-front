import axios from 'axios';
import { useState, useEffect } from 'react';

function useAPIGet(url, token) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios
            .get(
                url,
                token && {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(res => {
                const { data } = res;
                setResult(data);
            });
    }, [url]);

    return result;
}

export default useAPIGet;
