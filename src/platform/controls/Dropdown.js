import React, {Component} from 'react';
import './Dropdown.css';

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: props.selectedKey,
            items: props.items,
            empty: {
                key: '',
                value: ''
            },
            enabled: props.enabled === false ? false : true
        };
    }

    _onChange(event) {
        this.setState({selectedKey: event.target.value});
    }

    getValue () {
        return this.state.selectedKey;
    }

    isEmpty(){
        return false;
    }

    render() {
        return (
            <div className={('Dropdown ' + (this.props.className || ''))}>
                <select value={this.state.selectedKey}
                        disabled={!this.state.enabled}
                        onChange={(...args) => {this._onChange.apply(this, args)}}>
                    {this.state.items.map((item) => {return <option key={item.key} value={item.key}>{item.title}</option>})}
                </select>
            </div>
        );
    }
}

export default TextBox;
