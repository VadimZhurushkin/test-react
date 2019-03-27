import React, {Component} from 'react';
import Index from "../../platform/controls/CheckBox";
import data from "../../employees.json";
import Table from "../../platform/controls/Table";
import Button from "../../platform/controls/Button";
import FilterButton from "../../platform/controls/FilterButton";
import "./Page.css";
import EmployeeModel from "./EmployeeModel";

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                field: 'name',
                direction: 'asc'
            }
        };
    }

    startEdit() {
        const enabled = true;
        this.setState({isEdit: enabled});
        Object.keys(this.refs).forEach((key) => {
            this.refs[key].setState({enabled: enabled});
        })
    }

    saveChanges() {
        const enabled = false;
        this.setState({isEdit: enabled});
        Object.keys(this.refs).forEach((key) => {
            this.refs[key].setState({enabled: enabled});
        })
    }

    showPopup(item) {
        let user = item;
        let popupOpts = {
            opener: this,
            isStack: true,
            showEdit: true,
            isEdit: user.id === -1,
            title: 'edit user',
            filter: {},
            componentOptions: {
                user: user
            },
            contentComponent: 'modules/Employees/Card',
            beforeCloseCallback: function () {
                let item = this.refs.view.getItem(user.id);
                if (!item && user.id !== -1) {
                    this.refs.view.addItem(user);
                }
                this.refs.view.redraw();
            }.bind(this)
        };

        window.showPopup(popupOpts);
    }

    setOrder(field, direction) {
        let order = {
            field: field,
            direction: direction
        };
        this.refs.view.setOrder(order);
        this.setState({order: order});
    }

    addEmployee() {
        let newEmployee = new EmployeeModel();
        this.showPopup(newEmployee)
    }

    _updateFilter(filter) {
        this.refs.view.setFilter(filter);
        this.setState({filter: filter});
    }

    render() {
        return (
            <div className={'Employees'}>
                <div className={'CommandPanel'}><Button caption={'Добавить'}
                                                        clickHandler={() => {
                                                            this.addEmployee();
                                                        }}/><FilterButton filter={this.state.filter}
                                                                          filterComponent={'modules/Employees/PageFilter'}
                                                                          filterUpdatedCallback={(filter) => {
                                                                              this._updateFilter(filter);
                                                                          }}
                /></div>
                <Table ref={'view'} items={data} showHeader={true}
                       keyField={'id'}
                       filter={this.state.filter}
                       order={this.state.order}
                       columns={[{key: 'name', title: 'ФИО'}, {key: 'role', title: 'Должность'}, {
                           key: 'phone',
                           title: 'Телефон'
                       }, {
                           key: 'isArchive',
                           title: 'В архиве'
                       }]}
                       rowColumnTmpl={
                           function (column, item) {
                               let inArchiveCol = column.key === 'isArchive';
                               let currentValue = item[column.key];
                               return <span>{(column.key === 'select' || inArchiveCol) ?
                                   <Index enabled={!inArchiveCol}
                                          value={inArchiveCol ? currentValue : this.state.selectedItems[item[this.state.keyField]]}/> : currentValue}</span>
                           }
                       }
                       headerColumnTmpl={
                           (column) => {
                               let isFil = column.key === 'name';
                               let order = this.state.order;
                               return <span className={'column-' + column.key}>{column.title}{isFil ? <Button
                                   className={'icon-button small'}
                                   caption={order.field === column.key && order.direction === 'desc' ? '∧' : '∨'}
                                   clickHandler={() => {
                                       let order = this.state.order;
                                       this.setOrder(column.key, order.direction === 'asc' ? 'desc' : 'asc')
                                   }}
                               /> : ''}</span>
                           }
                       }
                       clickHandler={(item) => {
                           this.showPopup(item)
                       }}
                />
            </div>
        );
    }
}

export default UserCard;
