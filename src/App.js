import Header from './Header';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import './App.css';
import './icons/coolicons.css';
import 'normalize.css';

// const [n, setN] = useState(false);

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
