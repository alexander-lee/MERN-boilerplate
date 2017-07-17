import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Modal extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    hidden: this.props.hidden
  }

  componentWillReceiveProps(props) {
    this.setState({
      hidden: props.hidden
    });
  }

  _onOkClick = () => {
    if(this.props.onOk) {
      this.props.onOk();
    }

    this.setState({
      hidden: true
    });
  }

  render() {
    const overlayClasses = cx({
      hidden: this.state.hidden
    }, 'overlay');

    return (
      <div className={overlayClasses}>
        <div className="modal">
          {this.props.children}
          <div className="button-group">
            {this.props.onCancel ? <button onClick={this.props.onCancel}>Cancel</button> : null}
            <button onClick={this._onOkClick}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
