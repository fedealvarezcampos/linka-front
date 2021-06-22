import { useState } from 'react';
import { useGetMyDMs } from '../api/dms';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Post.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DMList({ sender }) {
    const user = useSelector(s => s?.user);
    const myId = useSelector(s => s.user?.id);
    const token = useSelector(s => s.user?.token);

    const myDMs = useGetMyDMs(sender, token);
    console.log(myDMs);

    return (
        <>
            {myDMs &&
                myDMs.map(dm => (
                    <div
                        key={dm.DMId}
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
                            <div>{dm.username}</div>
                            <div>{dm.text}</div>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default DMList;
