import React from 'react';
import onClickOutside from "react-onclickoutside";
import './Dropdown.css';

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: this.props.initalSelection
    };
    this.toggle = () => this.setState({ open: !this.state.open });
  };

  handleOnClick(item) {
    if(!this.state.selection.some(current => current.id === item.id)) {
      this.setState({ selection: [item] });
      this.props.parentCallback([item]);
    }
    this.setState({ open: false })
  };

  isSelected(item) {
    if(this.state.selection.some(current => current.id === item.id)) {
      return true
    }
    else {
      return false
    }
  };

  firstUpperCase(string) {
    if(isNaN(string)) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    else {
      return(string)
    }
  };

  handleClickOutside = evt => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps, prevState) {
      if(this.props.items !== prevProps.items) {
        this.setState({selection: this.props.initalSelection});
      }
  };
  
  render () {
    return (
      <div className="dd-wrapper">
        <div
        tabIndex={0}
        className={"dd-header" + (this.state.open ? " highlight" : (this.props.items.length > 0 ? (this.state.selection.length === 1 ? " selected" : ""): " not-clickable"))}
        role="button"
        onKeyPress={() => this.toggle()}
        onClick={() => this.toggle()}>
          <div className="dd-header__title">{this.state.selection.length === 1 ? this.firstUpperCase(this.state.selection[0].value) : this.props.textLabel}</div>
          <div className="arrow-container">
            <div className={this.state.open ? "arrow" : "arrow show-arrow"}></div>
          </div>
      </div>
      {this.state.open && (
        <div className="dd-list">
          {this.props.items.map(item => (
            <div className="dd-list-item" key={item.id}>
              <button className={this.isSelected(item) ? "selected" : null} type="button" onClick={() => this.handleOnClick(item)}>
                <span>{this.firstUpperCase(item.value)}</span>
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    );
  }
  
}



export default onClickOutside(Dropdown);

