import React from 'react';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
