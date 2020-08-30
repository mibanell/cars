import React, { Component } from 'react';
import FeaturesSelector from '../features/FeaturesSelector';
import PriceDisplay from '../price/PriceDisplay';
import './MainComp.css';


class MainComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: null,
            model: null,
            brand: null
        }
    }

    getParams = (currentParams) => {
        this.setState({
            brand: currentParams.brand,
            model: currentParams.model,
            price: currentParams.price
        });
        console.log(currentParams);
    }


    render(){
        return(
            <div className="main-component">
                <div className="column">
                    <div id="features-container">
                        <FeaturesSelector parentCallback = { this.getParams }/>
                    </div>
                </div>
                <div className="column fixed">
                    <div id="price-container">
                        <PriceDisplay price = { this.state.price } brand = { this.state.brand } model = { this.state.model }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainComp;