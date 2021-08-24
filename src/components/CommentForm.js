import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComment, postReply } from '../api/comments';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError } from '../helpers/toasts';
import '../styles/CommentForm.css';

const CommentForm = ({
    commentNumber,
    setCommentNumber,
    setCommentForm,
    nestedList,
    setNestedList,
    commentList,
    setCommentList,
    parentId,
}) => {
    const setLogNote = useSetLogNote();

    const token = useSelector(s => s.user?.token);

    const { postId } = useParams();

    // const [isSending, setIsSending] = useState(false);

    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (parentId) {
                const response = await postReply({ text }, postId, parentId, token);
                setNestedList([response, ...nestedList]);
                setCommentNumber(commentNumber + 1);
                setText('');
                setCommentForm(false);
            } else {
                const response = await postComment({ text }, postId, token);
                setCommentList([response, ...commentList]);
                setCommentNumber(commentNumber + 1);
                setText('');
            }
        } catch (error) {
            error?.response && notifyError(error.response.data.error);
            setLogNote(true);
        }
    };

    const submitOnEnter = e => {
        if (e.code === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <>
            {token ? (
                <form className="commentForm" onSubmit={handleSubmit}>
                    <label>
                        <span>Comment:</span>
                        <textarea
                            cols="35"
                            rows="6"
                            placeholder="Leave a comment..."
                            value={text}
                            onKeyDown={e => submitOnEnter(e)}
                            onChange={e => setText(e.target.value)}
                            type="text"
                        />
                    </label>
                    <button type="submit" className="button">
                        SEND
                    </button>
                </form>
            ) : (
                <div className="noCommentsHere">Log in to leave a message!</div>
            )}
        </>
    );
};

export default CommentForm;
