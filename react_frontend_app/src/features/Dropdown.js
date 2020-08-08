import React from 'react';

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
  }

  handleOnClick(item) {
    if(!this.state.selection.some(current => current.id === item.id)) {
      this.setState({ selection: item });
    }
    this.setState({ open: false })
  }
  
  render () {
    return (
      <div className="dd-wrapper">
        <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => this.toggle()}
        onClick={() => this.toggle()}>
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{this.state.title}</p>
          </div>
          <div className="dd-header__action">
            <p>{this.state.open ? 'Close' : 'Open'}</p>
          </div>
      </div>
      {this.state.open && (
        <ul className="dd-list">
          {this.state.items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => this.handleOnClick(item)}>
                <span>{item.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    );
  }
  
}



export default Dropdown;

