import React, { PureComponent } from 'react';
import styles from './style.css';
import PropTypes from 'prop-types';
import { Icon, Input } from 'antd';
class InputWrapper extends PureComponent {
  static defaultProps = {
    placeholder: '请输入',
    text: '',
    className: '',
    style: ''
  };
  static propTypes = {
    onEndEdit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      inputDisplay: false,
      iconDisplay: false,
      text: this.props.text
    }
  }
  onMouseOver = () => {
    this.setState({iconDisplay: true});
  }
  onMouseLeave = () => {
    this.setState({iconDisplay: false});
  }
  beginEdit = () => {
    this.setState({inputDisplay: true})
  }
  onBlur = () => {
    const { onEndEdit } = this.props;
    this.setState({inputDisplay: false})
    if (typeof onEndEdit === 'function') {
      onEndEdit(this.state.text)
    }
  }
  onChange = e => {
    this.setState({text: e.target.value});
  }
  componentDidUpdate() {
    const input = document.querySelector(`#input`);
    if (input) {
      const len = input.value.length;
      input.focus();
      input.setSelectionRange(len, len);
    }
  }
  render() {
    const { placeholder, className } = this.props;
    const { inputDisplay, iconDisplay, text } = this.state;
    return (
      <div 
        className={`${className} ${styles.inputWrapper}`} 
        onMouseOver={this.onMouseOver} 
        onMouseLeave={this.onMouseLeave}
      >
        <span className={styles.inputText}> 
          { 
            inputDisplay ? 
            <Input 
              id='input'
              placeholder={placeholder} 
              onChange={this.onChange} 
              onPressEnter={this.onBlur}
              value={text} 
              onBlur={this.onBlur}
            /> : text 
          } 
          { 
            iconDisplay && !inputDisplay ? 
            <Icon type="edit" onClick={this.beginEdit} className={styles.inputIcon}/> 
            : null 
          }
        </span>
      </div>
    )
  }
}

export default InputWrapper;