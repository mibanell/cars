import React, { Component } from 'react';
import Dropdown from './features/Dropdown';
import './FeaturesSelector.css';



class FeaturesSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      selectedBrand: [],
      selectedModel: [],
      models: []
    }
  }

  setBrandState = (selectedBrand) => {
    this.setState({selectedBrand: selectedBrand});
  };

  setModelState = (selectedModel) => {
    this.setState({selectedModel: selectedModel});
  };


  componentDidMount() {

    fetch('http://127.0.0.1:5000/brands')
        .then(res => res.json())
        .then(json => {
            this.setState({
                brands: json
            })
        }).catch((err) => {
            console.log(err);
        });

  }

  componentDidUpdate(prevProps, prevState) {

    if(this.state.selectedBrand !== prevState.selectedBrand) {
      if(this.state.selectedBrand.length > 0) {
        fetch('http://127.0.0.1:5000/models?brand='+ this.state.selectedBrand[0].value)
        .then(res => res.json())
        .then(json => {
          this.setState({
              models: json
          })
        }).catch((err) => {
          console.log(err);
        });
      }
    }

  }
  
  render() {
    return(
      <div className="FeaturesSelector">
        <div id="features-title">Select the car features</div>
        <div id="features-list">
          <Dropdown title="Brand" textLabel="Select brand" items= { this.state.brands } parentCallback = { this.setBrandState }/>
          <Dropdown title="Model" textLabel="Select model" items= { this.state.models } parentCallback = { this.setModelState }/>
        </div>
        
      </div>
    );
  }
}

export default FeaturesSelector;