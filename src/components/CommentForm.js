import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CommentForm = () => {
    const [isSending, setIsSending] = useState(false);
    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        setIsSending(true);

        const handleSubmit = async e => {
            e.preventDefault();
            try {
                const response = await login({
                    email,
                    password,
                });
                setShow(!show);
                passVisibility && setPassVisibility(false);
                dispatch({ type: 'LOGIN', user: response });
            } catch (error) {
                setError(error.response.data.error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Comment:</span>
                    <br />
                    <textarea
                        cols="35"
                        rows="6"
                        placeholder="bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        type="text"
                    />
                </label>
            </form>
        );
    };
};

export default CommentForm;
