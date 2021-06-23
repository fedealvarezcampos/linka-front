import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyDMs } from '../api/dms';
import DMSingle from './DMSingle';

function DMList({ sender, dmList, setDmList }) {
    const token = useSelector(s => s.user?.token);

    const myDMs = useGetMyDMs(sender, token);

    useEffect(() => {
        myDMs && setDmList(myDMs);
    }, [myDMs, setDmList]);

    return (
        <>
            {dmList && dmList.map(dm => <DMSingle key={dm.DMId} dm={dm} />)}
            {dmList?.length === 0 && !sender && <div className="noDMs">Choose a conversation or start a new one!</div>}
            {dmList?.length === 0 && sender && <div className="noDMs">No messages. Send the first one!</div>}
        </>
    );
}

export default DMList;
