/**
 * Created by bogdanbegovic on 3/22/17.
 */

import React, {PureComponent} from 'react';

export default class TreeFolderItem extends PureComponent {

    static propTypes = {
        handleClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <span className="tree-view-folder" onClick={() => { this.props.handleClick(this.props.name); }}>
                <i className="fa is-small fa-folder-o" />
                <span className="tree-view-folder-text">{this.props.name}</span>
            </span>
        );
    }
}
