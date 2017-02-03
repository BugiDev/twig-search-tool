import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div className="full-height">
        {this.props.children}
      </div>
    );
  }
}
