import './Button.css';

function Button({ children }) {
    return (
        <button className="button">
            <p>{children}</p>
        </button>
    );
}

export default Button;
