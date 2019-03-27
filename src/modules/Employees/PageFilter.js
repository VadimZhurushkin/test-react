import React, {Component} from 'react';
import TextBox from "../../platform/controls/TextBox";
import Dropdown from "../../platform/controls/Dropdown";
import Label from "../../platform/controls/Label";
import "./PageFilter.css";

class PageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getValue(){
        let newFilter = {};
        Object.keys(this.refs).forEach((key) => {
            let value = this.refs[key].getValue();
            if(value !== undefined) {
                newFilter[key] = value === 'false' || value === 'true'? JSON.parse(value) : value;
            }
        });
        return newFilter;
    }

    render() {
        return (
            <div className={'Filter'}>
                <div><Label caption="ФИО"/><TextBox ref={'name'}
                                                    text={this.props.filter ? this.props.filter.name || '' : ''}
                /></div>
                <div><Label caption="Телефон"/><TextBox ref={'phone'}
                                                        text={this.props.filter ? this.props.filter.phone || '' : ''}
                                                        format={'phone'}
                /></div>
                <div><Label caption="Должность"/><Dropdown ref={'role'}
                                                           selectedKey={(this.props.filter ? this.props.filter.role : '') || ''}
                                                           items={[
                                                               {
                                                                   key: '',
                                                                   title: 'выберите значение'
                                                               },
                                                               {
                                                                   key: 'driver',
                                                                   title: 'Водитель'
                                                               },
                                                               {
                                                                   key: 'waiter',
                                                                   title: 'Официант'
                                                               }, {
                                                                   key: 'cook',
                                                                   title: 'Повар'
                                                               }]}
                /></div>
                <div><Label caption="Состояние"/><Dropdown ref={'isArchive'}
                                                           selectedKey={this.props.filter ? this.props.filter.isArchive: ''}
                                                           items={[
                                                               {
                                                                   key: '',
                                                                   title: 'выберите значение'
                                                               },
                                                               {
                                                                   key: 'true',
                                                                   title: 'в архиве'
                                                               },
                                                               {
                                                                   key: 'false',
                                                                   title: 'активный'
                                                               }]}
                /></div>
            </div>
        );
    }
}

export default PageFilter;
