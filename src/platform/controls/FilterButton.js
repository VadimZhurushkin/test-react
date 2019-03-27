import React, {Component} from 'react';
import Button from './Button';

class FilterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: props.caption,
            tooltip: props.tooltip,
            enabled: props.enabled === false ? false : true,
            clickHandler: props.clickHandler,
            filterUpdatedCallback: props.filterUpdatedCallback
        };
    }

    getValue () {
        let popup = window.getPopup(this);
        return popup && popup.getValue() || {};
    }

    showPopup(e){
        let popupOpts = {
            opener: this,
            isStack: false,
            showEdit: false,
            targetElement: e.target,
            title: this.props.title || 'фильтр',
            ok: () => {
                this.state.filterUpdatedCallback(this.getValue());
            },
            componentOptions: {
                filter: this.props.filter
            },
            contentComponent: this.props.filterComponent
        };
        window.showPopup(popupOpts)
    }

    render() {
        return (
            <Button className={('filterButton ' + (this.props.className || ''))} title={this.props.tooltip}
                 disabled={!this.props.enabled} clickHandler={(event) => {this.showPopup(event)}} caption={'фильтр'} />
        );
    }
}

export default FilterButton;
