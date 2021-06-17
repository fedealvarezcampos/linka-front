import Comment from './SingleComment';

const CommentList = ({ commentList, commentsData, postId }) => {
    return (
        <>
            <div className="commentList">
                <ul className="commentListContainer">
                    <li>
                        {commentList &&
                            commentList.map(comment => <Comment key={comment.commentId} comment={comment} />)}
                        {commentsData &&
                            commentsData.map(comment => (
                                <Comment key={comment.commentId} comment={comment} postId={postId} />
                            ))}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default CommentList;
