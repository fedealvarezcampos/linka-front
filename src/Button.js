import './Button.css';

function Button({ children }) {
    return (
        <button className="button registerButton">
            <p>{children}</p>
        </button>
    );
}

export default Button;
