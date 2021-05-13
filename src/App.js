import Header from './Header/Header';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import './App.css';
import './icons/coolicons.css';
import 'normalize.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Modal>
                <RegisterForm />
            </Modal>
        </div>
    );
}

export default App;
