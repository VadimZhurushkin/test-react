import React, {Component} from 'react';
import './CheckBox.css';
import Label from './Label';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {caption: props.caption, value: props.value, enabled: props.enabled === false ? false : true};
    }

    _onChange() {
        this.setState({value: !this.getValue()});
    }

    getValue () {
        return this.state.value;
    }

    render() {
        return (
            <div className={('CheckBox ' + (this.props.className || ''))}>
                <input type="checkbox" checked={this.state.value}
                       onChange={(...args) => {this._onChange.apply(this, args)}}
                       disabled={!this.state.enabled}/><Label caption={this.props.caption}/>
            </div>
        );
    }
}

export default CheckBox;
