import './ErrorMessage.css';
import ShapeDivider from './ShapeDivider';

const ErrorMessage = () => {
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
                    <button className="error button">RELOAD</button>
                </div>
                <ShapeDivider />
            </div>
        </>
    );
};

export default ErrorMessage;
