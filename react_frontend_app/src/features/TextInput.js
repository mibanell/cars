import React from 'react';
import './TextInput.css';


class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
        this.props.parentCallback([event.target.value]);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="input-text">
                <input type="number" placeholder={this.props.placeholder} onChange={this.handleChange}/>
            </div>
            
        );
    }
}


export default TextInput;