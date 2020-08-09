import React from 'react';
import onClickOutside from "react-onclickoutside";
import './Dropdown.css';

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      open: false,
      selection: [],
      items: this.props.items
    };
    this.toggle = () => this.setState({ open: !this.state.open });
  };

  handleOnClick(item) {
    if(!this.state.selection.some(current => current.id === item.id)) {
      this.setState({ selection: [item] });
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
    return string.charAt(0).toUpperCase() + string.slice(1)
  };

  handleClickOutside = evt => {
    this.setState({ open: false });
  };
  
  render () {
    return (
      <div className="dd-wrapper">
        <div
        tabIndex={0}
        className={this.state.open ? "dd-header highlight" : "dd-header"}
        role="button"
        onKeyPress={() => this.toggle()}
        onClick={() => this.toggle()}>
          <div className="dd-header__title">{this.state.selection.length === 1 ? this.firstUpperCase(this.state.selection[0].value) : this.state.title}</div>
          <div className="arrow-container">
            <div className={this.state.open ? "arrow" : "arrow show-arrow"}></div>
          </div>
      </div>
      {this.state.open && (
        <div className="dd-list">
          {this.state.items.map(item => (
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
