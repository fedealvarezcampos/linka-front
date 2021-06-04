import { useGetMostLiked } from '../api/posts';
import PostMini from './PostMini';
import '../styles/ProfileCard.css';

const TopRated = ({ likes, setLikes }) => {
    const postsData = useGetMostLiked();

    return (
        <ul className="miniPostListContainer">
            {postsData &&
                postsData
                    .slice(0, 4)
                    .map(post => (
                        <PostMini likes={likes} setLikes={setLikes} key={post.postId} post={post} />
                    ))}
        </ul>
    );
};

export default TopRated;
