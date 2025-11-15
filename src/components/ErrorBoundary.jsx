// ErrorBoundary.jsx
// Purpose: Catch React errors and display fallback UI
// Prevents the entire app from crashing when a component errors

import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-700 mb-6">
              We're sorry, but something unexpected happened. Don't worry, it's
              not your fault!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-mint-300 hover:bg-mint-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
              >
                🔄 Try Again
              </button>
              <Link
                to="/"
                className="block w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold py-3 px-6 rounded-lg transition"
              >
                🏠 Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
