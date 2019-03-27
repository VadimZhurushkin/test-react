import React, {Component} from 'react';
import './Label.css';

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {caption: props.caption};
    }

    render() {
        return (
            <label className={('Label ' + (this.props.className || ''))}>{this.state.caption}</label>
        );
    }
}

export default Label;
