import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComment, postReply } from '../api/comments';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError } from '../helpers/toasts';
import '../styles/CommentForm.css';

const DMForm = () => {
    const setLogNote = useSetLogNote();

    const token = useSelector(s => s.user?.token);

    const { postId } = useParams();

    // const [isSending, setIsSending] = useState(false);

    const [dm, setDm] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (parentId) {
                const response = await postReply({ dm }, postId, parentId, token);
                setNestedList([response, ...nestedList]);
                setCommentNumber(commentNumber + 1);
                setDm('');
                setCommentForm(false);
            } else {
                const response = await postComment({ dm }, postId, token);
                setCommentList([response, ...commentList]);
                setCommentNumber(commentNumber + 1);
                setDm('');
            }
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
        <form className="commentForm" onSubmit={handleSubmit}>
            <label>
                <span>Comment:</span>
                <input
                    placeholder="write a message..."
                    value={DM}
                    // onKeyDown={e => submitOnEnter(e)}
                    onChange={e => setDM(e.target.value)}
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
