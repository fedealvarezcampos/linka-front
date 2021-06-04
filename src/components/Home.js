import { useState } from 'react';
import { useGetPosts } from '../api/posts';
import Post from './Post';
import TopRated from './TopRated';
import '../styles/Home.css';

function Home({ setError }) {
    const postsData = useGetPosts();

    return (
        <>
            <div className="App">
                <div className="homeContainer">
                    <ul className="postListContainer">
                        {postsData &&
                            postsData.map(post => <Post key={post.postId} post={post} setError={setError} />)}
                    </ul>
                    <TopRated />
                </div>
            </div>
        </>
    );
}

export default Home;
