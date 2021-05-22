import { useState } from 'react';
import { useGetPosts } from '../api/posts';
import Header from './Header';
import Post from './Post';
import ShapeDivider from './ShapeDivider';

function Home() {
    const [modal, setModal] = useState(false);

    const postsData = useGetPosts();
    console.log(postsData);

    return (
        <>
            <div className="App">
                <Header modal={modal} setModal={setModal} />
                <ul className="postListContainer">
                    {postsData && postsData.map(post => <Post key={post.postId} post={post} />)}
                </ul>
            </div>
        </>
    );
}

export default Home;
