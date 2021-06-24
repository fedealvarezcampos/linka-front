import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from '../api/users';
import { useGetMyList } from '../api/dms';
import { notifyError } from '../helpers/toasts';
import { useSetLogNote } from '../context/LogNoteContext';
import Spinner from '../assets/Spinner';
import DMList from './DMList';
import DMForm from './DMForm';
import '../styles/DirectMessages.css';

function DirectMessages() {
    const setLogNote = useSetLogNote();

    const token = useSelector(s => s.user?.token);
    const myPals = useGetMyList(token);

    const [sender, setsender] = useState();
    const [userSearch, setUserSearch] = useState('');
    const [userList, setuserList] = useState([]);
    const [directMessageList, setDirectMessageList] = useState([]);
    const [focusDMInput, setfocusDMInput] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        const element = containerRef.current;
        sender &&
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: 'smooth',
            });
    }, [sender]);

    useEffect(() => {
        myPals && setuserList(myPals);
    }, [myPals]);

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

    const handleSearchUser = async e => {
        e.preventDefault();
        try {
            const response = await getUserId(userSearch, token);
            setsender(response?.id);
            if (userList && userList.filter(e => e.username === userSearch).length === 0) {
                setuserList([...userList, response]);
            }
            setfocusDMInput(true);
            setUserSearch('');
        } catch (error) {
            error?.response && notifyError(error.response.data.error);
            setLogNote(true);
        }
    };

    const handleSetDMS = userId => {
        setsender(userId);
    };

    if (!myPals) {
        return <Spinner />;
    }

    return (
        <>
            <div className="DMsContainer">
                <div className="DMsInnerContainer" ref={containerRef}>
                    <div className="DMUserColumn">
                        <div className="DMuserList">
                            {userList &&
                                userList?.map(user => (
                                    <div
                                        key={user.recipientId || user.id}
                                        onClick={() => handleSetDMS(user.recipientId || user.id)}
                                        className={`DMuserContent ${
                                            sender === (user.recipientId || user.id) ? 'active' : ''
                                        }`}
                                    >
                                        <div>{user.username}</div>
                                    </div>
                                ))}
                        </div>
                        <form className="searchUserForm" onSubmit={handleSearchUser}>
                            <label>
                                <span>Find user:</span>
                                <input
                                    placeholder="user..."
                                    value={userSearch}
                                    onChange={e => setUserSearch(e.target.value)}
                                    type="text"
                                />
                            </label>
                        </form>
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
                        focus={focusDMInput}
                        setFocus={setfocusDMInput}
                    />
                </div>
            </div>
        </>
    );
}

export default DirectMessages;
