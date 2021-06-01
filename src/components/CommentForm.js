import { useState } from 'react';
import '../styles/CommentForm.css';

const CommentForm = () => {
    const [isSending, setIsSending] = useState(false);
    const [comment, setComment] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        // try {
        //     const response = await login(comment);
        // } catch (error) {
        //     setError(error.response.data.error);
        // }
    };

    return (
        <form className="commentForm" onSubmit={handleSubmit}>
            <label>
                <span>Comment:</span>
                <textarea
                    cols="35"
                    rows="6"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    type="text"
                />
            </label>
        </form>
    );
};

export default CommentForm;
