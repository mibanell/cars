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
          <Dropdown title="Brand" textLabel="Select brand" items= { this.state.brands } parentCallback = { this.setBrandState }/>
          <Dropdown title="Model" textLabel="Select model" items= { this.state.models } parentCallback = { this.setModelState }/>
          <br></br>
          <Dropdown title="Year of registration" textLabel="Select year" items= { this.state.years } parentCallback = { this.setYearState }/>
          <br></br>
          <TextInput title="Power" placeholder="Set power" />
          <Dropdown title="Fuel type" textLabel="Select fuel type" items= { this.state.fuels } parentCallback = { this.setFuelState }/>
          <Dropdown title="Gearbox" textLabel="Select gearbox" items= { this.state.gearboxes } parentCallback = { this.setGearboxState }/>
          <br></br>
          <TextInput title="Kilometers" placeholder="Set kilometers" />
          <Dropdown title="Has been repaired" textLabel="Select option" items= { this.state.repairedOpts } parentCallback = { this.setRepairedState }/>
        </div>
      </div>
    );
  }
}

export default FeaturesSelector;