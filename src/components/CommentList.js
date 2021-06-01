// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetComments } from '../api/comments';
import Comment from './SingleComment';

const CommentList = ({ id }) => {
    // const [comments, setComments] = useState();
    const commentsData = useGetComments(id);

    return (
        <>
            <div className="commentList">
                <ul className="commentListContainer">
                    {commentsData &&
                        commentsData.map(comment => <Comment key={comment.id} comment={comment} />)}
                </ul>
            </div>
        </>
    );
};

export default CommentList;
