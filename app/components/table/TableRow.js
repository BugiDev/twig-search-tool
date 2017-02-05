import React, {Component} from 'react';
import styles from './TableRow.css';

const {ipcRenderer} = require('electron');

export default class Menu extends Component {

    constructor() {
        super();
        this.state = {
            modified: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePathClick = this.handlePathClick.bind(this);
    }

    handleInputChange(event) {
        this.setState({modified: event.target.checked});
    }

    handlePathClick() {
        ipcRenderer.send('open-file', this.props.path);
    }

    render() {
        return (
            <tr className={this.state.modified ? styles.rowModified : null}>
                <th>{this.props.number + 1}</th>
                <td><a onClick={this.handlePathClick}>{this.props.path}</a>
                </td>
                <td>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={this.state.modified} onChange={this.handleInputChange}/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                        </label>
                    </div>
                </td>
            </tr>
        );
    }
}
