import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //yypically you would logthis
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this Listing{" "}
          <Link to="/">click hrer to go back to your home page</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
