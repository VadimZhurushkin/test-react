import React, {Component} from 'react';
import './List.css';

const BASEContentTemplate = function (item) {
    return <div className="list-item">{item.name}</div>
};

const BASETemplate = function (item) {
    return <div className="list-item">
        {this.state.itemContentTmpl.apply(this,[item])}
    </div>
};

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {items: props.items, template: props.template, displayText: '', itemContentTmpl: props.itemContentTmpl || BASEContentTemplate};
    }

    render() {
        return (
            <div className={('list ' + (this.props.className || ''))}>
                {this.state.items.map((item) => {
                    return (this.state.template ? this.state.template : BASETemplate).apply(this, [item])
                })}
            </div>
        );
    }
}

export default List;
