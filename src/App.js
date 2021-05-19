import { useState } from 'react';
import { useSortPosts } from './api';
import Header from './components/Header';
import Post from './components/Post';
import './App.css';
import './icons/coolicons.css';
import 'normalize.css';

function App() {
    const [user, setUser] = useState(false);
    const [modal, setModal] = useState(false);

    const postsData = useSortPosts();

    return (
        <>
            <div className="App">
                <Header user={user} setUser={setUser} modal={modal} setModal={setModal} />
                <ul className="postListContainer">
                    {postsData && postsData.map((post, i) => <Post key={post.id} post={post} />)}
                </ul>
            </div>
        </>
    );
}

export default App;
