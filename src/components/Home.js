// import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPosts, useGetSomePosts } from '../api/posts';
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
    // const [newPosts, setNewPosts] = useState([]);

    const postsData = useGetSomePosts(sort, 1);
    const morePostsData = useGetSomePosts(sort, page);

    useEffect(() => {
        setPosts(postsData);
    }, [postsData]);

    console.log(posts);

    if (!postsData) {
        return <Spinner />;
    }

    const fetchMore = () => {
        setPage(page => page + 1);
        setPosts([...posts, ...morePostsData]);
    };

    console.log(page);

    return (
        <>
            <div className="App">
                <NavSort setPage={setPage} setSort={setSort} />
                <div className="homeContainer">
                    <InfiniteScroll
                        dataLength={posts && posts?.length}
                        next={fetchMore}
                        hasMore={true}
                        scrollThreshold={'20px'}
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
