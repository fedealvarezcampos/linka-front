import { useState } from 'react';
import Header from './components/Header';
import Post from './components/Post';
import './App.css';
import './icons/coolicons.css';
import 'normalize.css';

function App() {
    const [user, setUser] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className="App">
                <Header user={user} setUser={setUser} modal={modal} setModal={setModal} />
                <Post />
            </div>
        </>
    );
}

export default App;
