import { useSelector } from 'react-redux';
import { useGetPosts } from '../api/posts';
import Spinner from '../assets/Spinner';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';

function Home({ setError }) {
    const postsData = useGetPosts();
    const user = useSelector(s => s.user);

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
                    <div className="homeOuterContainer">
                        <div className="homeSidebarContainer">
                            {user && <Search />}
                            <TopRated />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
