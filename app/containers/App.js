import React, {Component} from 'react';
import {Router, hashHistory} from 'react-router';
import routes from '../routes';
import SettingsModal from '../components/settings/SettingsModal';

const Config = require('electron-config');

const config = new Config();

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            showSettings: !config.get('basePath')
        };

        this.onSettingsSave = this.onSettingsSave.bind(this);
    }

    onSettingsSave() {
        this.setState({
            showSettings: false
        });
    }

    render() {
        const appRender = this.state.showSettings ? <SettingsModal disableCancel onSaveSettings={this.onSettingsSave}/> : <Router history={hashHistory} routes={routes}/>;
        return (
            <div className="full-height">
                {appRender}
            </div>
        );
    }
}
