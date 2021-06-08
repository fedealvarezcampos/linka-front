// import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useGetPosts } from '../api/posts';
import Spinner from '../assets/Spinner';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';

function Home({ setError }) {
    // console.log(postsData);
    // const postsChunkedData = _.chunk(postsData, 2);
    // console.log(postsChunkedData);
    const user = useSelector(s => s?.user);
    const [logNote, setLogNote] = useState(false);

    // let [page, setPage] = useState(1);
    // const [posts, setPosts] = useState([]);

    const postsData = useGetPosts();
    // const postsData = useGetSomePosts(page);

    // console.log(postsData);

    // useEffect(() => {
    //     postsData && setPosts(postsData);
    // }, [postsData]);

    if (!postsData) {
        return <Spinner />;
    }

    // const fetchMore = () => {
    //     setPage(page => page + 1);
    //     let [...newPosts] = postsData;
    //     setPosts([...posts, ...newPosts]);
    // };

    // console.log(page);
    // console.log(posts);

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    {/* <InfiniteScroll
                        dataLength={fullData.length}
                        next={fetchMore}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    > */}
                    <ul className="postListContainer">
                        {postsData &&
                            postsData.map(post => (
                                <Post
                                    key={post.postId}
                                    post={post}
                                    setError={setError}
                                    setLogNote={setLogNote}
                                />
                            ))}
                    </ul>
                    {/* </InfiniteScroll> */}
                    <div className="homeOuterContainer">
                        <div className="homeSidebarContainer">
                            {user && <Search />}
                            <TopRated />
                        </div>
                    </div>
                    {logNote && <ToastContainer limit="3" />}
                </div>
            </div>
        </>
    );
}

export default Home;
