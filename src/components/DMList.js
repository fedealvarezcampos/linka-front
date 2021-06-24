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
            {dmList?.length === 0 && !sender && (
                <div className="noDMs">
                    <span>
                        Choose a conversation
                        <br />
                        or start a new one! <i className="bi bi-lightning-charge-fill" />
                    </span>
                </div>
            )}
            {dmList?.length === 0 && sender && (
                <div className="noDMs">
                    <span>
                        No messages.
                        <br />
                        Send the first one! <i className="bi bi-lightning-charge-fill" />
                    </span>
                </div>
            )}
        </>
    );
}

export default DMList;
