import React, {Component} from 'react';
import Index from './CheckBox';
import './Table.css';

const HEADERTEMPLATE = function () {

    return <tr className="list-item" key={this.state.addKey + '-headerRow'}>
        {this.state.columns.map((column) => {
            let columnKey = this.state.addKey + '-headerColumn-' + column.key;
            return <th key={columnKey}>{this.state.headerColumnTmpl(column)}</th>;
        })}
    </tr>
};

const ROWCOLUMNTMPL = function (column, item) {
    return <span>{column.key === 'select' ?
        <Index key={this.state.addKey + '-item-select-' + item[this.state.keyField]}/> : item[column.key]}</span>;
};

const ROWTEMPLATE = function (item) {
    return <tr className="list-item" key={this.state.addKey + '-item-' + item[this.state.keyField]} onClick={() => {
        this.clickHandler(item)
    }}>
        {this.state.columns.map((column) => {
            let columnKey = this.state.addKey + '-bodyColumn-' + column.key;
            return <td key={columnKey}
                       className={'column-' + column.key}>{this.state.rowColumnTmpl.apply(this, [column, item])}</td>
        })}
    </tr>
};

const HEADERCOLUMN = function (column) {
    return <span className={'column-' + column.key}>{column.title}</span>
};

class Table extends Component {
    constructor(props) {
        super(props);
        let currentState = {
            lastRedraw: 0,
            useSelect: props.useSelect || false,
            template: props.template || ROWTEMPLATE,
            showHeader: props.showHeader,
            keyField: props.keyField,
            headerColumnTmpl: props.headerColumnTmpl || HEADERCOLUMN,
            clickHandler: props.clickHandler,
            filter: props.filter || {},
            order: props.order || {},
            rowColumnTmpl: props.rowColumnTmpl || ROWCOLUMNTMPL,
            headerTmpl: props.headerTmpl || HEADERTEMPLATE
        };

        currentState.addKey = (new Date()).getTime();

        currentState.columns = (props.useSelect ? [{key: 'select'}] : []).concat(props.columns);
        currentState.items = [].concat((props.items ? props.items : []));
        currentState.filteredItems = this.orderItems(this.filterItems(currentState), currentState);
        currentState.selectedItems = [].concat((props.selectedItems ? props.selectedItems : []));

        this.state = currentState;
    }

    redraw(){
        this.updateItems();
    }

    getItems(){
        return this.state.items;
    }
    getItem(id){
        let items = this.getItems();
        let item = items.filter((item)=>{return item.id === id});
        return item.length? item[0]: null;
    }
    addItem(item){
        let items = this.getItems();
        items.push(item);
        this.updateItems();
    }

    setFilter(newFilter) {
        this.state.filter = newFilter;
        this.updateItems();
    }

    updateItems(){
        let filteredItems = this.orderItems(this.filterItems(this.state), this.state);
        this.setState({'filteredItems': filteredItems});
    }


    setOrder(newOrder) {
        this.state.order = newOrder;
        this.updateItems();
    }

    orderItems(items, state) {
        let order = state.order || {};
        let _items;
        if (order.field) {
            _items = items.sort((a, b) => {
                let aText = (order.direction === 'asc' ? a : b)[order.field];
                let bText = (order.direction === 'asc' ? b : a)[order.field];
                let returnValue = -1;
                if (aText > bText) {
                    returnValue = 1;
                } else if (aText === bText) {
                    returnValue = 0;
                }
                return returnValue;
            });
        } else {
            _items = items;
        }
        return _items;
    }

    filterItems(state) {
        let filter = state.filter || {};
        let filterKeys = Object.keys(filter);
        let newItems = [].concat(state.items);
        if (filterKeys.length) {
            let newFilter = {};
            filterKeys.forEach((key) => {
                newFilter[key] = filter[key].toString().replace(/\s/gm, '').replace(/[^a-z0-9а-я]/gmi, '')
            });
            newItems = state.items.filter((item) => {
                let saved = true;
                let count = 0;
                while (saved && count < filterKeys.length) {
                    let key = filterKeys[count];
                    if (newFilter[key] !== '' && !new RegExp(newFilter[key], 'gmi').test(item[key].toString().replace(/\s/gm, '').replace(/[^a-z0-9а-я]/gmi, ''))) {
                        saved = false;
                    }
                    count++;
                }
                return saved;
            });
        }
        return newItems;
    }

    clickHandler(item) {
        this.state.clickHandler && this.state.clickHandler(item);
    }

    render() {
        return (
            <table className={('Table ' + (this.props.className || ''))}>
                {this.state.showHeader ? <thead>{this.state.headerTmpl.call(this)}</thead> : ''}
                <tbody>{(this.state.filteredItems).map((item) => {
                    return (this.state.template ? this.state.template : ROWTEMPLATE).apply(this, [item])
                })}
                </tbody>
            </table>
        );
    }
}

export default Table;
