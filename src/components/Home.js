import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { notifyMessage } from '../helpers/toasts';
import Spinner from '../assets/Spinner';
import { useGetSomePosts } from '../api/posts';
import { userValidation } from '../api/users';
import NavSort from './NavSort';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';

function Home({ sort, setSort, setError, setLogNote }) {
    const { uuid } = useParams();

    if (uuid) {
        userValidation(uuid);
        notifyMessage('User validated! You can log in now.');
    }

    const user = useSelector(s => s?.user);

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
                <NavSort setPage={setPage} sort={sort} setSort={setSort} />
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
                                    <Post
                                        sort={sort}
                                        key={post.postId}
                                        post={post}
                                        setError={setError}
                                        setLogNote={setLogNote}
                                    />
                                ))}
                        </ul>
                    </InfiniteScroll>
                    <div className="homeOuterContainer">
                        <div className="homeSidebarContainer">
                            {user && <Search setLogNote={setLogNote} setSort={setSort} setError={setError} />}
                            <TopRated setLogNote={setLogNote} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
