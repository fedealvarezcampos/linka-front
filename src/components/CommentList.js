import Comment from './SingleComment';

const CommentList = ({ commentList, commentsData }) => {
    console.log(commentsData);
    return (
        <>
            <div className="commentList">
                <ul className="commentListContainer">
                    {commentList &&
                        commentList.map(comment => <Comment key={comment.commentId} comment={comment} />)}
                    {commentsData &&
                        commentsData.map(comment => (
                            <Comment key={comment.commentId} comment={comment} commentsData={commentsData} />
                        ))}
                </ul>
            </div>
        </>
    );
};

export default CommentList;
