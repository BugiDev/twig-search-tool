import React, {PureComponent} from 'react';
import styles from './TableRow.css';
import Checkbox from '../checkbox/Checkbox';

const {ipcRenderer} = require('electron');

export default class TableRow extends PureComponent {

    constructor() {
        super();
        this.state = {
            modified: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePathClick = this.handlePathClick.bind(this);
    }

    handleInputChange(event, checked) {
        this.setState({modified: checked});
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
                    <Checkbox checked={this.state.modified} onChange={this.handleInputChange} />
                </td>
            </tr>
        );
    }
}
