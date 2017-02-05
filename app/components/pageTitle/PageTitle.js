import React, {Component} from 'react';

export default class PageTitle extends Component {

    render() {
        return (
            <div>
                <p className="title">{this.props.title}</p>
                <p>{this.props.subtitle}</p>
                <hr/>
            </div>
        );
    }
}
