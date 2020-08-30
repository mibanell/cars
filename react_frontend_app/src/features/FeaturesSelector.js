import React, { Component } from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
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
      selectedKilometers: [],
      selectedRepairedOpts: [],
      params_ok: false,
      price: null
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
    var model = this.state.selectedModel[0];
    var yearOfRegistration = this.state.selectedYear[0];
    var powerPS = this.state.selectedPower[0];
    var fuelType = this.state.selectedFuel[0];
    var gearbox = this.state.selectedGearbox[0];
    var kilometer = this.state.selectedKilometers[0];
    var notRepairedDamage = this.state.selectedRepairedOpts[0];

    if(
      model !== undefined & yearOfRegistration !== undefined & powerPS !== undefined & powerPS !== "" &
      fuelType !== undefined & gearbox !== undefined & kilometer !== undefined & kilometer !== "" & notRepairedDamage !== undefined
    ) {
        var url = 'http://127.0.0.1:5000/predict?';
        url = url +
            'model=' + model.value +
            '&yearOfRegistration=' + yearOfRegistration.value +
            '&powerPS=' + powerPS +
            '&fuelType=' + fuelType.value +
            '&gearbox=' + gearbox.value +
            '&kilometer=' + kilometer +
            '&notRepairedDamage=' + notRepairedDamage.value
        
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({price: json.price})
            })
    } else {
      console.log("ah ah")
    }
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
        this.setState({selectedModel: []})
      }
    }

    var model = this.state.selectedModel[0];
    var yearOfRegistration = this.state.selectedYear[0];
    var powerPS = this.state.selectedPower[0];
    var fuelType = this.state.selectedFuel[0];
    var gearbox = this.state.selectedGearbox[0];
    var kilometer = this.state.selectedKilometers[0];
    var notRepairedDamage = this.state.selectedRepairedOpts[0];

    if(
      model !== undefined & yearOfRegistration !== undefined & powerPS !== undefined & powerPS !== "" &
      fuelType !== undefined & gearbox !== undefined & kilometer !== undefined & kilometer !== "" & notRepairedDamage !== undefined
    ) {
      if(!this.state.params_ok) {
        console.log("gucci");
        this.setState({params_ok: true});
      }
    } else {
      if(this.state.params_ok) {
        console.log("no gucci");
        this.setState({params_ok: false});
      }
    }

    if(this.state.price !== prevState.price) {
      this.props.parentCallback({
        brand: this.state.selectedBrand[0].value,
        model: this.state.selectedModel[0].value,
        price: this.state.price
      });
    }
  }
  
  render() {
    return(
      <div className="FeaturesSelector">
        <div id="features-title">Select the car features</div>
        <div id="features-list">
          <Dropdown title="" textLabel="Brand" initalSelection={[]} items= { this.state.brands } parentCallback = { this.setBrandState }/>
          <Dropdown title="" textLabel="Model" initalSelection={this.state.selectedModel} items= { this.state.models } parentCallback = { this.setModelState }/>
          <Dropdown title="" textLabel= "Year of registration" initalSelection={[]} items= { this.state.years } parentCallback = { this.setYearState }/>
          <TextInput title="" placeholder="Power" parentCallback = { this.setPowerState }/>
          <Dropdown title="" textLabel="Fuel type" initalSelection={[]} items= { this.state.fuels } parentCallback = { this.setFuelState }/>
          <Dropdown title="" textLabel="Gearbox" initalSelection={[]} items= { this.state.gearboxes } parentCallback = { this.setGearboxState }/>
          <TextInput title="" placeholder="Kilometers" parentCallback = { this.setKilometersState }/>
          <Dropdown title="" textLabel="Any reparation?" initalSelection={[]} items= { this.state.repairedOpts } parentCallback = { this.setRepairedState }/>
        </div>
        <div className="button-container">
          <div className="separator-button"></div>
          <div className={ "calculate-button" + (this.state.params_ok ? "" : " not-clickable")} onClick={() => this.makePrediction()}>
            <div className="calculate-button-text">Calculate price</div>
          </div>
          <div className="separator-button"></div>
        </div>
      </div>
    );
  }
}

export default FeaturesSelector;