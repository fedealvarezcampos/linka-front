import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetMyList = token => useAPIGet(`${baseURL}/dms`, token);

const useGetMyDMs = (senderId, token) => useAPIGet(`${baseURL}/dms/${senderId}`, token);

const sendDM = async (userId, dmText, token) => {
    const { data } = await axios.post(`${baseURL}/dms/${userId}`, dmText, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export { useGetMyDMs, useGetMyList, sendDM };
