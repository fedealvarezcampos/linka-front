import { useGetPosts } from '../api/posts';
import Post from './Post';

function Home() {
    const postsData = useGetPosts();

    return (
        <>
            <div className="App">
                <ul className="postListContainer">
                    {postsData && postsData.map(post => <Post key={post.postId} post={post} />)}
                </ul>
            </div>
        </>
    );
}

export default Home;
