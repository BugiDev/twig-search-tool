/**
 * Created by bogdanbegovic on 3/22/17.
 */

import React, {PureComponent} from 'react';

export default class TreeFileItem extends PureComponent {

    static propTypes = {
        handleClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        path: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="tree-view-file" onClick={() => { this.props.handleClick(this.props.path); }}>
                <i className="fa is-small fa-file-code-o tree-view-file-icon" />
                <span className="tree-view-file-text">{this.props.name}</span>
            </div>
        );
    }
}
