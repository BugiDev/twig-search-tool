import React, {Component} from 'react';
import Checkbox from '../chekcbox/Checkbox';

const Config = require('electron-config');

const config = new Config();

export default class SettingsModal extends Component {

    static propTypes = {
        onCancelSettings: React.PropTypes.func,
        onSaveSettings: React.PropTypes.func,
        disableCancel: React.PropTypes.bool
    };

    constructor() {
        super();

        this.state = {};

        console.log(config.get('basePath'));
        console.log(config.get('ide'));

        this.state.basePath = config.get('basePath') || '';

        this.state.ide = config.get('ide') ||
            {
                phpStorm: false,
                vscode: false,
                atom: false,
                brackets: false,
                sublime: false,
                notepad: false,
                netbeans: false
            };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onCancelSettings = this.onCancelSettings.bind(this);
        this.onSaveSettings = this.onSaveSettings.bind(this);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.handlePathChangeClick = this.handlePathChangeClick.bind(this);
        this.handleComboboxChange = this.handleComboboxChange.bind(this);
    }

    onCancelSettings() {
        this.props.onCancelSettings && this.props.onCancelSettings();
    }

    onSaveSettings() {
        config.set({
            basePath: this.state.basePath,
            ide: this.state.ide
        });
        this.props.onSaveSettings && this.props.onSaveSettings();
    }

    handlePathChange(event) {
        this.setState({
            basePath: event.target.files[0].path
        });
    }

    handlePathChangeClick() {
        this.setState({
            basePath: null
        });
    }

    handleComboboxChange(name, checked) {
        const ide = {
            phpStorm: name === 'phpStorm' ? checked : false,
            vscode: name === 'vscode' ? checked : false,
            atom: name === 'atom' ? checked : false,
            brackets: name === 'brackets' ? checked : false,
            sublime: name === 'sublime' ? checked : false,
            notepad: name === 'notepad' ? checked : false,
            netbeans: name === 'netbeans' ? checked : false
        };
        this.setState({
            ide
        });
    }

    render() {

        const pathInput = (
            <div>
                <p className="subtitle">Chose your base path to search .twig files</p>
                <input
                    type="file"
                    ref={(i) => {
                        if (i) {
                            i.webkitdirectory = true;
                        }
                    }}
                    onChange={this.handlePathChange}
                />
            </div>
        );

        const pathDisplay = (
            <div>
                <p className="subtitle">Your base path:</p>
                <p className="subtitle primary-color">{this.state.basePath}</p>
                <div className="level">

                    <div className="level-left">

                    </div>

                    <div className="level-right">
                        <div className="control is-grouped">
                            <p className="control">
                                <button
                                    className="button is-primary is-outlined"
                                    onClick={this.handlePathChangeClick}
                                >
                                    Change base path
                                </button>
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        );

        const renderPath = this.state.basePath ? pathDisplay : pathInput;

        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="box">

                        <h1 className="title">Settings</h1>
                        <hr />

                        {renderPath}

                        <hr />
                        <p className="subtitle">Chose your IDE</p>

                        <Checkbox name="phpStorm" key="phpStorm" checked={this.state.ide.phpStorm} label="PHP Storm" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="vscode" key="vscode" checked={this.state.ide.vscode} label="Visual studio code" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="atom" key="atom" checked={this.state.ide.atom} label="Atom" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="brackets" key="brackets" checked={this.state.ide.brackets} label="Brackets" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="sublime" key="sublime" checked={this.state.ide.sublime} label="Sublime" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="notepad" key="notepad" checked={this.state.ide.notepad} label="Notepad ++" onChange={this.handleComboboxChange}/>
                        <br />
                        <Checkbox name="netbeans" key="netbeans" checked={this.state.ide.netbeans} label="Netbeans" onChange={this.handleComboboxChange}/>

                        <hr />

                        <div className="level">

                            <div className="level-left"/>

                            <div className="level-right">
                                <div className="control is-grouped">
                                    <p className="control">
                                        <button className="button is-primary" onClick={this.onSaveSettings}>
                                            Save
                                        </button>
                                    </p>
                                    <p className="control">
                                        <button className={`button is-primary is-outlined ${this.props.disableCancel ? 'is-disabled' : ''}`} onClick={this.onCancelSettings}>Cancel</button>
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
