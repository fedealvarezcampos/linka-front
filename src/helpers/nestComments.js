function nestComments(commentList) {
    const commentMap = {};

    commentList?.forEach(comment => (commentMap[comment.commentId] = comment));

    commentList?.forEach(comment => {
        if (comment.parentId !== null) {
            const parent = commentMap[comment.parentId];
            parent && (parent.children = parent.children || []).push(comment);
        }
    });

    return commentList?.filter(comment => {
        return comment.parentId === null;
    });
}

export default nestComments;
