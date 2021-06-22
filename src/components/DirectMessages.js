import { useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useSetLogNote } from '../context/LogNoteContext';
import DMList from './DMList';
import '../styles/DirectMessages.css';
import { useGetMyList } from '../api/dms';
import { Link } from 'react-router-dom';

function DirectMessages() {
    const token = useSelector(s => s.user?.token);
    const myPals = useGetMyList(token);

    const [sender, setsender] = useState();
    console.log(myPals);

    return (
        <>
            <div className="DMsContainer">
                <div className="DMsInnerContainer">
                    <div className="DMuserList">
                        {myPals &&
                            myPals.map(user => (
                                <div key={user.userId}>
                                    <div onClick={() => setsender(user.userId)}>{user.username}</div>
                                </div>
                            ))}
                    </div>
                    <div className="DMConvoContainer">
                        <DMList sender={sender} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DirectMessages;
