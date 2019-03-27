import React, {Component} from 'react';
import './App.css';
import Nav from './platform/controls/Nav';
import PageLoader from './platform/controls/PageLoader';
import pagesList from './pages.json';
import PopupManager from "./platform/controls/PopupManager";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class App extends Component {
    render() {

        let needPage = {Component: '404'};
        pagesList.forEach((page) => {
            if (window.location.pathname === page.path) {
                needPage = page;
            }
        });
        return (
            <div className="App">
                <div className="head"></div>
                <Router>
                    <div className="body">
                        <PopupManager />
                        <div className="leftColumn">
                            <Nav items={pagesList}/>
                        </div>
                        <div className="rightColumn">
                            <PageLoader pageControl={needPage.component}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
