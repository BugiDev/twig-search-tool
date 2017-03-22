import React, {PureComponent} from 'react';

export default class PageTitle extends PureComponent {

    render() {
        return (
            <div>
                <p className="title">{this.props.title}</p>
                <p>{this.props.subtitle}</p>
                <hr />
            </div>
        );
    }
}
