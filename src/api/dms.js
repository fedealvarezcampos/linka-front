import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';

const { REACT_APP_BASEAPI: baseURL } = process.env;

const useGetMyList = token => useAPIGet(`${baseURL}/dms`, token);

const useGetMyDMs = (senderId, token) => useAPIGet(senderId && `${baseURL}/dms/${senderId}`, token);

const sendDM = async (dmText, recipientId, token) => {
    const { data } = await axios.post(`${baseURL}/dms/${recipientId}`, dmText, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetMyDMs, useGetMyList, sendDM };
