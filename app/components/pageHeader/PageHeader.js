import React, {PureComponent} from 'react';
import SettingsModal from '../settings/SettingsModal';

const Config = require('electron-config');

const config = new Config();

export default class PageHeader extends PureComponent {

    constructor() {
        super();

        this.state = {
            basePath: config.get('basePath'),
            showSettings: false
        };

        this.onSettingsClose = this.onSettingsClose.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
    }

    onSettingsClose() {
        this.setState({
            basePath: config.get('basePath'),
            showSettings: false
        });
    }

    handleSettingsClick() {
        this.setState({
            basePath: config.get('basePath'),
            showSettings: true
        });
    }

    render() {
        const renderSettings = this.state.showSettings ? <SettingsModal onCancelSettings={this.onSettingsClose} onSaveSettings={this.onSettingsClose}/> : null;

        return (
            <div className="level">
                {renderSettings}
                <div className="level-left">
                    <div className="level-item">
                        <div>
                            <p className="subtitle">Base path: <span className="primary-color">{this.state.basePath}</span></p>
                        </div>
                    </div>
                </div>
                <div className="level-right">
                    <a onClick={this.handleSettingsClick} className="button is-primary is-outlined">
                        <span className="icon">
                            <i className="fa fa-cogs"/>
                        </span>
                        <span>Settings</span>
                    </a>
                </div>
            </div>
        );
    }
}
