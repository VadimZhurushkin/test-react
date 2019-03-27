import React, {Component} from 'react';

class PageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {pageControlUrl: props.pageControl,pageControl: '' };
        require(['./../../'+this.state.pageControlUrl], (component) => {
            this.setState({pageControl: (<component.default />)});
        });
    }

    render() {
        return (
            <div className={'PageContent'}>
                {this.state.pageControl}
            </div>
        );
    }
}

export default PageLoader;
