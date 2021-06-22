import axios from 'axios';
import useAPIGet from '../hooks/useAPIGet';
const baseURL = 'http://localhost:8080/api';

const useGetMyList = token => useAPIGet(`${baseURL}/dms`, token)

const useGetMyDMs = (senderId, token) => useAPIGet(`${baseURL}/dms/${senderId}`, token);

export { useGetMyDMs, useGetMyList };
