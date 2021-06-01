import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postComment } from '../api/comments';
import '../styles/CommentForm.css';

const CommentForm = ({ id, setError }) => {
    const token = useSelector(s => s.user?.token);

    const [isSending, setIsSending] = useState(false);

    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await postComment({ text }, id, token);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <form className="commentForm" onSubmit={handleSubmit}>
            <label>
                <span>Comment:</span>
                <textarea
                    cols="35"
                    rows="6"
                    placeholder="Leave a comment..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type="text"
                />
            </label>
            <button className="button">SEND</button>
        </form>
    );
};

export default CommentForm;
