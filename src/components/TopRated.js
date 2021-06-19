import { useGetPosts } from '../api/posts';
import PostMini from './PostMini';
import Spinner from '../assets/Spinner';
import '../styles/ProfileCard.css';

const TopRated = ({ likes, setLikes }) => {
    const postsData = useGetPosts('mostliked');

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <div className="miniPostListOuterContainer">
            <span className="topRatedTitle">
                <i className="bi bi-lightning-fill" />
                Top this week
            </span>
            <ul className="miniPostListContainer">
                {postsData &&
                    postsData
                        .slice(0, 4)
                        .map(post => (
                            <PostMini likes={likes} setLikes={setLikes} key={post.postId} post={post} />
                        ))}
            </ul>
        </div>
    );
};

export default TopRated;
