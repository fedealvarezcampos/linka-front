// import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetSomePosts } from '../api/posts';
import Spinner from '../assets/Spinner';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';
import NavSort from './NavSort';

function Home({ sort, setSort, setError, setLogNote }) {
    const user = useSelector(s => s?.user);

    let [page, setPage] = useState(2);
    const [posts, setPosts] = useState([]);

    const postsData = useGetSomePosts(sort, 1);
    const morePostsData = useGetSomePosts(sort, page);

    useEffect(() => {
        setPosts(postsData);
    }, [postsData]);

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
                            {user && <Search setLogNote={setLogNote} setError={setError} />}
                            <TopRated />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
