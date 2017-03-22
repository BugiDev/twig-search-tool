import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class MenuItem extends PureComponent {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        link: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <li>
                <Link to={this.props.link} activeClassName="is-active">
                    {this.props.name}
                </Link>
            </li>
        );
    }
}
