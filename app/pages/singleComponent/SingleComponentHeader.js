/**
 * Created by bogdanbegovic on 3/18/17.
 */
import React, {Component} from 'react';

export default class SingleComponentHeader extends Component {

    constructor() {
        super();
        this.state = {
            componentName: ''
        };

        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleComponentNameChange(event) {
        this.setState({componentName: event.target.value});
    }

    handleSubmit() {
        if (this.state.componentName) {
            this.props.onSubmit(this.state.componentName);
        }
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.componentName) {
                this.props.onSubmit(this.state.componentName);
            }
        }
    }

    clear() {
        this.setState({
            componentName: ''
        });
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-one-third">
                    <label className="label">Component Name</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ui:component-name"
                            value={this.state.componentName}
                            onChange={this.handleComponentNameChange}
                            onKeyPress={this.handleKeyPress}
                        />
                    </p>
                    <div className="control is-grouped">
                        <p className="control">
                            <button
                                className={`button is-primary ${this.state.componentName ? '' : 'is-disabled'}`}
                                onClick={this.handleSubmit}
                            >Search
                            </button>
                        </p>
                        <p className="control">
                            <button className="button is-link" onClick={this.clear}>Clear</button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
