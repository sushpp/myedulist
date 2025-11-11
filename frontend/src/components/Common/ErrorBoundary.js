import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
<<<<<<< HEAD
        <div className="error-boundary" style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>Something went wrong</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
            We're sorry, but something went wrong. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Refresh Page
          </button>
=======
        <div className="error-boundary">
          <div className="error-content">
            <h2>Something went wrong</h2>
            <p>We're sorry, but something went wrong. Please try refreshing the page.</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
>>>>>>> c15d45fca (Initial commit)
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;