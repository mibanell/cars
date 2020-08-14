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
      fuels: [],
      gearboxes: [],
      repairedOpts: [],
      selectedBrand: [],
      selectedModel: [],
      selectedFuel: [],
      selectedGearbox: [],
      selectedRepairedOpts: []
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
  setFuelState = (selectedFuel) => {
    this.setState({selectedFuel: selectedFuel});
  };
  setGearboxState = (selectedGearbox) => {
    this.setState({selectedGearbox: selectedGearbox});
  };
  setRepairedState = (selectedRepairedOpts) => {
    this.setState({selectedRepairedOpts: selectedRepairedOpts});
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
    this.setState({ years: list });

    fetch('http://127.0.0.1:5000/fuelType')
        .then(res => res.json())
        .then(json => {
            this.setState({
                fuels: json
            })
        }).catch((err) => {
            console.log(err);
        });

    fetch('http://127.0.0.1:5000/gearbox')
    .then(res => res.json())
    .then(json => {
        this.setState({
            gearboxes: json
        })
    }).catch((err) => {
        console.log(err);
    });

    fetch('http://127.0.0.1:5000/notRepairedDamage')
    .then(res => res.json())
    .then(json => {
        this.setState({
            repairedOpts: json
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
          <Dropdown title="Brand" textLabel="" items= { this.state.brands } parentCallback = { this.setBrandState }/>
          <Dropdown title="Model" textLabel="" items= { this.state.models } parentCallback = { this.setModelState }/>
          <Dropdown title="Year of registration" textLabel= "" items= { this.state.years } parentCallback = { this.setYearState }/>
          <TextInput title="Power" placeholder="" />
          <Dropdown title="Fuel type" textLabel="" items= { this.state.fuels } parentCallback = { this.setFuelState }/>
          <Dropdown title="Gearbox" textLabel="" items= { this.state.gearboxes } parentCallback = { this.setGearboxState }/>
          <TextInput title="Kilometers" placeholder="" />
          <Dropdown title="Has been repaired" textLabel="" items= { this.state.repairedOpts } parentCallback = { this.setRepairedState }/>
        </div>
        <div id="button-container">
          <div class="separator-button"></div>
          <div id="calculate-button">
            <div id="calculate-button-text">Calculate price</div>
          </div>
          <div class="separator-button"></div>
        </div>
      </div>
    );
  }
}

export default FeaturesSelector;