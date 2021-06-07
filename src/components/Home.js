import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetPosts } from '../api/posts';
import Spinner from '../assets/Spinner';
import TopRated from './TopRated';
import Search from './Search';
import Post from './Post';
import '../styles/Home.css';
import _ from 'lodash';

function Home({ setError }) {
    const postsData = useGetPosts();
    console.log(postsData);
    const postsChunkedData = _.chunk(postsData, 2);
    // console.log(postsChunkedData);

    let [page, setPage] = useState(0);
    const [posts, setPosts] = useState();

    useEffect(() => {
        postsChunkedData && setPosts(postsChunkedData[0]);
    }, [postsData]);

    const user = useSelector(s => s.user);

    if (!postsData) {
        return <Spinner />;
    }

    const fetchMore = () => {
        setPage(page++);
        let [...newPosts] = postsChunkedData[page];
        setPosts([...posts, ...newPosts]);
    };

    // console.log(page);
    // console.log(posts);

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    <ul className="postListContainer">
                        <InfiniteScroll
                            dataLength={postsData.length}
                            next={fetchMore}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                        >
                            {posts &&
                                posts.map(post => <Post key={post.postId} post={post} setError={setError} />)}
                        </InfiniteScroll>
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
