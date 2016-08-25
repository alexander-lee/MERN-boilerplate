import React from 'react';

export default class IndexWrapper extends React.Component {
  render() {
    return (
      <div>
        <h1> Test App </h1>
        {this.props.children}
      </div>
    );
  }
}
