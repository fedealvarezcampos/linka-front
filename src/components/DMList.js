import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyDMs } from '../api/dms';
import DMSingle from './DMSingle';
import Spinner from '../assets/Spinner';

function DMList({ sender, dmList, setDmList }) {
    const token = useSelector(s => s.user?.token);

    const myDMs = useGetMyDMs(sender, token);

    useEffect(() => {
        myDMs && setDmList(myDMs);
    }, [myDMs, setDmList]);

    // if (dmList?.length === 0) {
    //     return <Spinner />;
    // }

    return (
        <>
            {dmList && dmList.map(dm => <DMSingle key={dm.DMId} dm={dm} />)}
            {dmList?.length === 0 && !sender && (
                <div className="noDMs">Choose a conversation or start a new one!</div>
            )}
            {dmList?.length === 0 && sender && <div className="noDMs">No messages. Send the first one!</div>}
        </>
    );
}

export default DMList;
