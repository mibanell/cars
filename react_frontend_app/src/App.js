import React, { Component } from 'react';
import Dropdown from './features/Dropdown';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      isLoaded: false
    }
  }
  
  componentDidMount() {

    fetch('http://127.0.0.1:5000/brands')
        .then(res => res.json())
        .then(json => {
            this.setState({
                brands: json,
                isLoaded: true, 
            })
        }).catch((err) => {
            console.log(err);
        });

  }
  
  render() {
    var { isLoaded, brands } = this.state;

    if(!isLoaded) {
      return (
      <div>Loading...</div>
      );
    }
    else {
      return(
        <div className="App">
          <Dropdown title="Brands" items= { brands }/>
        </div>
      );
    }
  }
}

export default App;