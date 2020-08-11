import React, { Component } from 'react';
import Dropdown from './features/Dropdown';
import TextInput from './features/TextInput';
import './FeaturesSelector.css';



class FeaturesSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      models: [],
      years: [],
      selectedBrand: [],
      selectedModel: [],
    }
  }

  setBrandState = (selectedBrand) => {
    this.setState({selectedBrand: selectedBrand});
  };
  setModelState = (selectedModel) => {
    this.setState({selectedModel: selectedModel});
  };
  setYearState = (selectedYear) => {
    this.setState({selectedYear: selectedYear});
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
    
    var list = [];
    var j = 1;
    for (var i = 2017; i >= 1970; i--) {
      list.push({"id": j, "value": i});
      j += 1;
    }
    this.setState({ years: list })

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
          <Dropdown title="Year of registration" textLabel="Select year" items= { this.state.years } parentCallback = { this.setYearState }/>
          <TextInput title="Power" placeholder="Set power" />
        </div>
      </div>
    );
  }
}

export default FeaturesSelector;