import { useGetPosts } from '../api/posts';
import PostMini from './PostMini';
import Spinner from '../assets/Spinner';
import '../styles/ProfileCard.css';

const TopRated = ({ likes, setLikes, setLogNote }) => {
    const postsData = useGetPosts('mostliked');

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <div className="miniPostListOuterContainer">
            <ul className="miniPostListContainer">
                {postsData &&
                    postsData
                        .slice(0, 4)
                        .map(post => (
                            <PostMini
                                likes={likes}
                                setLogNote={setLogNote}
                                setLikes={setLikes}
                                key={post.postId}
                                post={post}
                            />
                        ))}
            </ul>
        </div>
    );
};

export default TopRated;
