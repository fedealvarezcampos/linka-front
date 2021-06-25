import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

function DMSingle({ dm }) {
    const { REACT_APP_STATIC: staticURL } = process.env;

    const myId = useSelector(s => s.user?.id);

    return (
        <>
            <div
                className={`DMMessage ${
                    (myId !== dm.userId && 'receivedMessage') || (myId === dm.userId && 'sentMessage')
                }`}
            >
                <div
                    className="DMAvatar"
                    style={{
                        backgroundImage: `url(${staticURL}images/avatars/${dm.avatar || 'default.jpg'})`,
                    }}
                />

                <div className="DMContent">
                    <span>
                        <div className="DMUsername">{dm.username}</div>
                        <ReactTimeAgo date={new Date(dm.created_date)} locale="en-US" timeStyle="Round" />
                    </span>
                    <div className="DMText">{dm.text}</div>
                </div>
            </div>
        </>
    );
}

export default DMSingle;
