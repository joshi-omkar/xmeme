import React, { Component } from 'react';

class PageWrapper extends Component {
    render() {
        return (
            <div className='PageWrapper'>
                
                {this.props.children}
            </div>
        );
    }
}

export default PageWrapper;
