import { useState } from 'react';
import { useGetMyDMs } from '../api/dms';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Post.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DMList({ sender }) {
    const user = useSelector(s => s?.user);
    const token = useSelector(s => s.user?.token);

    const myDMs = useGetMyDMs(sender, token);

    console.log(myDMs);

    return (
        <>
            {myDMs &&
                myDMs.map(dm => (
                    <div key={dm.DMId}>
                        <div>{dm.username}</div>
                        <div>{dm.text}</div>
                    </div>
                ))}
        </>
    );
}

export default DMList;
