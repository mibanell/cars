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
      selectedYear: [],
      selectedPower: [],
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
  setPowerState = (selectedPower) => {
    this.setState({selectedPower: selectedPower});
  };
  setFuelState = (selectedFuel) => {
    this.setState({selectedFuel: selectedFuel});
  };
  setGearboxState = (selectedGearbox) => {
    this.setState({selectedGearbox: selectedGearbox});
  };
  setKilometersState = (selectedKilometers) => {
    this.setState({selectedKilometers: selectedKilometers});
  };
  setRepairedState = (selectedRepairedOpts) => {
    this.setState({selectedRepairedOpts: selectedRepairedOpts});
  };
  

  makePrediction() {
    var model = this.state.selectedModel[0].value;
    var yearOfRegistration = this.state.selectedYear[0].value;
    var powerPS = this.state.selectedPower[0];
    var fuelType = this.state.selectedFuel[0].value;
    var gearbox = this.state.selectedGearbox[0].value;
    var kilometer = this.state.selectedKilometers[0];
    var notRepairedDamage = this.state.selectedRepairedOpts[0].value;
    

    var url = 'http://127.0.0.1:5000/predict?';
    url = url +
        'model=' + model +
        '&yearOfRegistration=' + yearOfRegistration +
        '&powerPS=' + powerPS +
        '&fuelType=' + fuelType +
        '&gearbox=' + gearbox +
        '&kilometer=' + kilometer +
        '&notRepairedDamage=' + notRepairedDamage
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })
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
          <Dropdown title="" textLabel="Brand" items= { this.state.brands } parentCallback = { this.setBrandState }/>
          <Dropdown title="" textLabel="Model" items= { this.state.models } parentCallback = { this.setModelState }/>
          <Dropdown title="" textLabel= "Year of registration" items= { this.state.years } parentCallback = { this.setYearState }/>
          <TextInput title="" placeholder="Power" parentCallback = { this.setPowerState }/>
          <Dropdown title="" textLabel="Fuel type" items= { this.state.fuels } parentCallback = { this.setFuelState }/>
          <Dropdown title="" textLabel="Gearbox" items= { this.state.gearboxes } parentCallback = { this.setGearboxState }/>
          <TextInput title="" placeholder="Kilometers" parentCallback = { this.setKilometersState }/>
          <Dropdown title="" textLabel="Has been repaired" items= { this.state.repairedOpts } parentCallback = { this.setRepairedState }/>
        </div>
        <div id="button-container">
          <div className="separator-button"></div>
          <div id="calculate-button" onClick={() => this.makePrediction()}>
            <div id="calculate-button-text">Calculate price</div>
          </div>
          <div className="separator-button"></div>
        </div>
      </div>
    );
  }
}

export default FeaturesSelector;