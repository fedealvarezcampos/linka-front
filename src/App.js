import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import 'normalize.css';
import './resource/icons/coolicons.css';
import './App.css';
import ShapeDivider from './components/ShapeDivider';

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
                <ShapeDivider />
            </Route>
            <Route path="/users/:username" exact>
                <UserProfile />
                <ShapeDivider />
            </Route>
        </Switch>
    );
}

export default App;
