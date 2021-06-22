import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sendDM } from '../api/dms';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError } from '../helpers/toasts';
import '../styles/CommentForm.css';

const DMForm = ({ recipientId, dmList, setDmList }) => {
    const setLogNote = useSetLogNote();

    const token = useSelector(s => s.user?.token);

    // const [isSending, setIsSending] = useState(false);

    const [text, setText] = useState('');

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

    // const submitOnEnter = e => {
    //     if (e.code === 'Enter') {
    //         handleSubmit(e);
    //     }
    // };

    return (
        <form className="dmForm" onSubmit={handleSubmit}>
            <label>
                <span>Send a DM:</span>
                <input
                    placeholder="write a message..."
                    value={text}
                    // onKeyDown={e => submitOnEnter(e)}
                    onChange={e => setText(e.target.value)}
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
