import { useState } from 'react';
import Header from './Header';
import './App.css';
import './anims.css';
import './icons/coolicons.css';
import 'normalize.css';

function App() {
    const [user, setUser] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <div className="App">
            <Header user={user} setUser={setUser} modal={modal} setModal={setModal} />
        </div>
    );
}

export default App;
