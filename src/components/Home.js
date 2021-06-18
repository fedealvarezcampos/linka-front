import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSetLogNote } from '../context/LogNoteContext';
import { notifyError, notifyMessage } from '../helpers/toasts';
import Spinner from '../assets/Spinner';
import { useGetSomePosts } from '../api/posts';
import { userValidation } from '../api/users';
import NavSort from './NavSort';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';

function Home({ sort, setSort, setError }) {
    const setLogNote = useSetLogNote();

    const { uuid } = useParams();

    const user = useSelector(s => s?.user);

    const handleValidation = async () => {
        try {
            await userValidation(uuid);
            setLogNote(true);
            notifyMessage('User validated! Log in now.');
            // dispatch({ type: 'LOGIN', user: response });
        } catch (error) {
            // setError(error.response.data.error);
            setLogNote(true);
            notifyError(error.response.data.error);
        }
    };

    useEffect(() => {
        uuid && handleValidation();
    });

    let [page, setPage] = useState(2);
    const [posts, setPosts] = useState([]);

    const postsData = useGetSomePosts(sort, 1);
    const morePostsData = useGetSomePosts(sort, page);

    useEffect(() => {
        setPosts(postsData);
    }, [postsData]);

    useEffect(() => {
        setSort('');
    }, [setSort]);

    if (!postsData) {
        return <Spinner />;
    }

    const fetchMore = () => {
        setPage(page => page + 1);
        setPosts([...posts, ...morePostsData]);
    };

    return (
        <>
            <div className="App">
                <NavSort page={page} setPage={setPage} sort={sort} setSort={setSort} />
                <div className="homeContainer">
                    <InfiniteScroll
                        dataLength={posts && posts?.length}
                        next={fetchMore}
                        hasMore={true}
                        scrollThreshold={'50px'}
                        loader={<h4>Loading...</h4>}
                    >
                        <ul className="postListContainer">
                            {posts &&
                                posts.map(post => (
                                    <Post sort={sort} key={post.postId} post={post} setError={setError} />
                                ))}
                        </ul>
                    </InfiniteScroll>
                    <div className="homeOuterContainer">
                        <div className="homeSidebarContainer">
                            {user && <Search setSort={setSort} setError={setError} />}
                            <TopRated />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
