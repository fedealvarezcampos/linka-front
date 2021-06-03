import { useGetMostLiked } from '../api/posts';
import PostMini from './PostMini';
import '../styles/ProfileCard.css';

const TopRated = () => {
    const postsData = useGetMostLiked();

    return (
        <ul className="miniPostListContainer">
            {postsData && postsData.map(post => <PostMini key={post.postId} post={post} />)}
        </ul>
    );
};

export default TopRated;
