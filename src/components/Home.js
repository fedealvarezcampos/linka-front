import { useGetPosts } from '../api/posts';
import Post from './Post';
import TopRated from './TopRated';
import Spinner from '../assets/Spinner';
import '../styles/Home.css';
import Search from './Search';

function Home({ setError }) {
    const postsData = useGetPosts();

    if (!postsData) {
        return <Spinner />;
    }

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    <ul className="postListContainer">
                        {postsData &&
                            postsData.map(post => <Post key={post.postId} post={post} setError={setError} />)}
                    </ul>
                    <div className="homeSidebarContainer">
                        <Search />
                        <TopRated />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
