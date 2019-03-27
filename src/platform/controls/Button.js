import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: props.caption,
            tooltip: props.tooltip,
            enabled: props.enabled === false ? false : true,
            clickHandler: props.clickHandler
        };
    }

    render() {
        return (
            <div className={('button ' + (this.props.className || ''))} title={this.props.tooltip}
                 disabled={!this.props.enabled} onClick={this.props.clickHandler}>{this.props.caption}</div>
        );
    }
}

export default Button;
