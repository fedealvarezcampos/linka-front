import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyList } from '../api/dms';
import DMList from './DMList';
import DMForm from './DMForm';
import '../styles/DirectMessages.css';

function DirectMessages() {
    const token = useSelector(s => s.user?.token);
    const myPals = useGetMyList(token);

    const [sender, setsender] = useState();
    const [directMessageList, setDirectMessageList] = useState([]);

    const containerRef = useRef(null);

    // useEffect(() => {
    //     const element = containerRef.current;
    //     element.scroll({
    //         top: element.scrollHeight,
    //         left: 0,
    //         behavior: 'smooth',
    //     });
    // });

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, [containerRef, directMessageList]);

    return (
        <>
            <div className="DMsContainer">
                <div className="DMsInnerContainer" ref={containerRef}>
                    <div>
                        <div className="DMuserList">
                            {myPals &&
                                myPals.map(user => (
                                    <div key={user.userId}>
                                        <div onClick={() => setsender(user.userId)}>{user.username}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="DMConvoContainer">
                        <DMList dmList={directMessageList} setDmList={setDirectMessageList} sender={sender} />
                    </div>
                </div>
                <div className="dmFormContainer">
                    <DMForm
                        dmList={directMessageList}
                        setDmList={setDirectMessageList}
                        recipientId={sender}
                    />
                </div>
            </div>
        </>
    );
}

export default DirectMessages;
