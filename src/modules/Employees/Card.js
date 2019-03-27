import React, {Component} from 'react';
import CheckBox from "../../platform/controls/CheckBox";
import TextBox from "../../platform/controls/TextBox";
import Dropdown from "../../platform/controls/Dropdown";
import Label from "../../platform/controls/Label";
import "./Card.css";

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            isEdit: props.isEdit
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
        let hasError = false;
        Object.keys(this.refs).forEach((key) => {
            let control = this.refs[key];
            this.state.user[key] = control.getValue();
            if(key !== 'isArchive' && control.isEmpty()){
                hasError = true;
            }
        });
        if(hasError) {
            window.showPopup({
                popupClass: 'error',
                title: 'ошибка',
                content: 'Не все поля заполнены'
            })
        } else {

            Object.keys(this.refs).forEach((key) => {
                let control = this.refs[key];
                control.setState({enabled: enabled});
            });
            this.state.user.id = this.state.user.id === -1 ? (new Date()).getTime() : this.state.user.id;
            this.setState({isEdit: enabled});
        }
        return hasError;
    }

    render() {
        return (
            <div className={'userCard'}>
                <div><Label caption="ФИО"/><TextBox ref={'name'} text={this.state.user.name}
                                                    enabled={this.state.isEdit}/></div>
                <div><Label caption="Телефон"/><TextBox ref={'phone'} text={this.state.user.phone} format={'phone'}
                                                        enabled={this.state.isEdit}/></div>
                <div><Label caption="Дата рождения"/><TextBox ref={'birthday'} text={this.state.user.birthday}
                                                              format={'date'}
                                                              enabled={this.state.isEdit}/></div>
                <div><Label caption="Должность"/><Dropdown ref={'role'} selectedKey={this.state.user.role}
                                                           enabled={this.state.isEdit}
                                                           items={[{key: 'driver', title: 'Водитель'}, {
                                                               key: 'waiter',
                                                               title: 'Официант'
                                                           }, {key: 'cook', title: 'Повар'}]}/></div>
                <div><Label caption="Статус"/><CheckBox ref={'isArchive'} value={this.state.user.isArchive}
                                                        enabled={this.state.isEdit} caption={'в архиве'}/></div>
            </div>
        );
    }
}

export default UserCard;
