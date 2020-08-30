import React, { Component } from 'react';
import './PriceDisplay.css';

class PriceDisplay extends Component {
    
    firstUpperCase(string) {
        if(isNaN(string)) {
          return string.charAt(0).toUpperCase() + string.slice(1)
        }
        else {
          return(string)
        }
      };

    render() {
        return(
            <div id="price">
                <div id="app-name">How much is my car worth?</div>
                <div id="author">
                    <a href="https://miguelangelbg.github.io/" target="_blank">by Miguel Ángel Ballester Granell</a>
                </div>
                <div id="logo" className={ this.props.brand }></div>
                <div id="price-info">
                    <div id="car-props">
                        <div id="car-brand">{ this.firstUpperCase(this.props.brand) }</div>
                        <div className="text-space"></div>
                        <div id="car-model">{ this.firstUpperCase(this.props.model) }</div>
                    </div>
                    <div id="price-value">
                        { this.props.price !== null ? Math.round(this.props.price, 0) + " €" : "" }
                    </div>
                </div>
            </div>
        )
    }
}


export default PriceDisplay;