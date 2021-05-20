import { useState } from 'react';
import { useGetPosts } from './api/posts';
import { useUser, useSetUser } from './context/UserContext';
import Header from './components/Header';
import Post from './components/Post';
import ShapeDivider from './components/ShapeDivider';
import 'normalize.css';
import './resource/icons/coolicons.css';
import './App.css';

function App() {
    const user = useUser();
    const setUser = useSetUser();
    const [modal, setModal] = useState(false);

    const postsData = useGetPosts();

    return (
        <>
            <div className="App">
                <Header user={user} setUser={setUser} modal={modal} setModal={setModal} />
                <ul className="postListContainer">
                    {postsData && postsData.map(post => <Post key={post.postId} post={post} />)}
                </ul>
                <ShapeDivider />
            </div>
        </>
    );
}

export default App;
