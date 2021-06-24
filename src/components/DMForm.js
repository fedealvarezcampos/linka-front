import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendDM } from '../api/dms';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError } from '../helpers/toasts';
import '../styles/CommentForm.css';

const DMForm = ({ recipientId, dmList, setDmList, focus, setFocus }) => {
    const setLogNote = useSetLogNote();

    const token = useSelector(s => s.user?.token);

    const dmInput = useRef(null);

    // const [isSending, setIsSending] = useState(false);

    const [text, setText] = useState('');

    useEffect(() => {
        focus && dmInput.current.focus();
        setFocus(false);
    }, [focus, setFocus]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await sendDM({ text }, recipientId, token);
            setDmList([...dmList, response]);
            setText('');
        } catch (error) {
            error?.response && notifyError(error.response.data.error);
            setLogNote(true);
        }
    };

    return (
        <form className="dmForm" onSubmit={handleSubmit}>
            <label>
                <span>Send a DM:</span>
                <input
                    placeholder="write a message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    ref={dmInput}
                    type="text"
                />
            </label>
            <button type="submit" className="button">
                SEND
            </button>
        </form>
    );
};

export default DMForm;
