/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class ErrorFuse extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

export default ErrorFuse;