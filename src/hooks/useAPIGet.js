import axios from 'axios';
import { useState, useEffect } from 'react';

function useAPIGet(url, token) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        url &&
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
    }, [url, token]);

    return result;
}

export default useAPIGet;
