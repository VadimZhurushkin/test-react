import React, {Component} from 'react';
import Button from './Button';
import './Popup.css';

const BASEHEADER = function (opts) {
    return <span className={'title'}>{opts.title}</span>;
};

const BASECONTENT = function (opts) {
    return <div className={'content'}>{opts.content}</div>;
};

const BASEPOPUP = function (opts) {
    let style = {};
    let width = (opts.width || 300);

    style.zIndex = opts.zIndex;
    style.width = width + 'px';
    if (opts.isStack === false) {
        style.height = (opts.height ? opts.height + 'px' : 'auto');
    }

    if (opts.targetElement) {
        let client = opts.targetElement.getBoundingClientRect();
        if ((client.left + width) <= window.innerWidth) {
            style.left = client.left;
        } else {
            style.left = (client.right < window.innerWidth ? client.right : window.innerWidth) - width;
        }
        style.top = client.top;
    } else if(!opts.isStack) {
        opts.height = opts.height || 100;
        style.top = window.innerHeight / 2 - ((opts.height) / 2);
        style.left = window.innerWidth / 2 - ((width) / 2);
    }

    let editSaveToggle = (key) => {
        if (opts.isEdit) {
            this.savePopup(key)
        } else {
            this.editPopup(key);
        }
    };

    return <div ref={opts.Id} className={('popup ' + (opts.popupClass || '') + (opts.isStack ? 'stack' : ''))}
                key={opts.Id}
                style={style}>
        <div className={'header'}>
            {opts.headerTmpl.apply(this, [opts])}
            {opts.showEdit ?
                <Button className={opts.isEdit ? 'save border primary' : 'edit'} clickHandler={() => {
                    editSaveToggle(opts.Id)
                }} caption={opts.isEdit ? 'Сохранить' : 'Изменить'}></Button> : ''}
            {opts.ok ?
                <Button className={'ok border primary'} clickHandler={() => {
                    opts.ok(opts.Id);
                    this.closePopup(opts.Id);
                }} caption={opts.okCaption || 'ОК'}></Button> : ''}
            <Button className={'close icon-button medium'} clickHandler={() => {
                this.closePopup(opts.Id);
            }}></Button>
        </div>
        <div className={'body'}>
            {(opts.contentTmpl || BASECONTENT).apply(this, [opts])}
        </div>
    </div>
};

class PopupManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPopups: {},
            showEdit: props.showEdit
        };
        window.showPopup = (opts) => {
            this.openPopup(opts);
        };
        window.getPopup = (opener) => {
            return this.getPopup(opener);
        };
    }

    getPopup(opener) {
        let popup = null;
        Object.keys(this.state.currentPopups).forEach((key) => {
            let opts = this.state.currentPopups[key];
            if (opts.opener === opener) {
                popup = this.refs[key + 'content'];
            }
        });
        return popup
    }

    openPopup(props) {
        let _openPopup = (component) => {
            props.Id = (new Date()).getTime();
            props.headerTmpl = typeof props.headerTmpl === 'function' ? props.headerTmpl : BASEHEADER;
            if (component) {
                props.contentTmpl = function () {
                    props.componentOptions.isEdit = props.isEdit;
                    return (<component.default {...props.componentOptions} ref={(props.Id + 'content')}/>)
                };
            }


            this.state.currentPopups[props.Id] = props;
            this.setState({currentPopups: this.state.currentPopups});
        };
        if (props.contentComponent) {
            require(['./../../' + props.contentComponent], (component) => {
                _openPopup(component);
            })
        } else {
            _openPopup();
        }
    }

    editPopup(key) {
        this.state.currentPopups[key].isEdit = true;
        this.refs[key + 'content'].startEdit();
        this.setState(this.state);
    }

    savePopup(key) {

        let hasError = this.refs[key + 'content'].saveChanges();
        if(!hasError) {
            this.state.currentPopups[key].isEdit = hasError;
            this.setState(this.state);
        }
    }

    closePopup(id) {
        let popup = this.state.currentPopups[id];
        if (popup.beforeCloseCallback) {
            popup.beforeCloseCallback(popup, this.refs[id + 'content'])
        }
        this.state.currentPopups[id] = null;
        delete this.state.currentPopups[id];
        this.setState(this.state);
    }

    render() {
        return (
            <div>{Object.keys(this.state.currentPopups).map((popupKey, i) => {
                let popup = this.state.currentPopups[popupKey];
                popup.zIndex = 1000 + i;
                return popup ? BASEPOPUP.apply(this, [popup]) : '';
            })}</div>
        );
    }
}

export default PopupManager;
