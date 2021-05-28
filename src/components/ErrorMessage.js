import '../styles/ErrorMessage.css';
import ShapeDivider from './ShapeDivider';
import { NavLink } from 'react-router-dom';

const ErrorMessage = () => {
    const reload = e => {
        e.stopPropagation();
        window.location.reload();
    };

    return (
        <>
            <div className="errorContainer">
                <div class="notfound">
                    <div class="notfound-404">
                        <h3>Ouch! Something happened</h3>
                        <h1>
                            <span>4</span>
                            <span>0</span>
                            <span>4</span>
                        </h1>
                    </div>
                    <h2>
                        the page you requested
                        <br />
                        was not found
                    </h2>
                    <p>maybe try again?</p>
                    <div className="errorButtonsContainer">
                        <button className="reload button" onClick={reload}>
                            RELOAD
                        </button>
                        <NavLink to="/">
                            <button className="home button" onClick={reload}>
                                HOME
                            </button>
                        </NavLink>
                    </div>
                </div>
                <ShapeDivider />
            </div>
        </>
    );
};

export default ErrorMessage;
