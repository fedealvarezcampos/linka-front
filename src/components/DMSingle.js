import { useSelector } from 'react-redux';

function DMSingle({ dm }) {
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
                        backgroundImage: `url(http://localhost:8080/images/avatars/${
                            dm.avatar || 'default.jpg'
                        })`,
                    }}
                />
                <div className="DMContent">
                    <div className="DMUsername">{dm.username}</div>
                    <div className="DMText">{dm.text}</div>
                </div>
            </div>
        </>
    );
}

export default DMSingle;
