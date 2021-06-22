import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyDMs } from '../api/dms';
import DMSingle from './DMSingle';

function DMList({ sender, dmList, setDmList }) {
    const token = useSelector(s => s.user?.token);

    const myDMs = useGetMyDMs(sender, token);

    return (
        <>
            {myDMs && myDMs.map(dm => <DMSingle key={dm.DMId} dm={dm} />)}
            {dmList && dmList.map(dm => <DMSingle key={dm.DMId} dm={dm} />)}
        </>
    );
}

export default DMList;
