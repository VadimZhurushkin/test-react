import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import List from './List';
import './Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {items: props.items, displayText: ''};
    }

    render() {
        return (
            <List className={('Nav ' + (this.props.className || ''))} items={this.state.items} itemContentTmpl={function (item) {
                return (<div key={item.Id} className={('item'+ (item.path === window.location.pathname? ' current': '') )}><Link to={item.path} >{item.title}</Link></div>);
            }}/>
        );
    }
}

export default Nav;
