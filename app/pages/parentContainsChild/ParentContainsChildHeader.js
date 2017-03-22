import React, { PureComponent } from 'react';

export default class ParentContainsChildHeader extends PureComponent {

    constructor() {
        super();
        this.state = {
            parentName: '',
            childName: ''
        };
        this.clear = this.clear.bind(this);
        this.handleParentNameChange = this.handleParentNameChange.bind(this);
        this.handleChildNameChange = this.handleChildNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    clear() {
        this.setState({
            parentName: '',
            childName: ''
        });
    }

    handleParentNameChange(event) {
        this.setState({ parentName: event.target.value });
    }

    handleChildNameChange(event) {
        this.setState({ childName: event.target.value });
    }

    handleSubmit() {
        if (this.state.parentName && this.state.childName) {
            this.props.onSubmit(this.state.parentName, this.state.childName);
        }
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.parentName && this.state.childName) {
                this.props.onSubmit(this.state.parentName, this.state.childName);
            }
        }
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-one-third">
                    <label className="label">Parent Component Name</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ui:component-name"
                            value={this.state.parentName}
                            onChange={this.handleParentNameChange}
                            onKeyPress={this.handleKeyPress}
                        />
                    </p>
                    <label className="label">Child Component Name</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ui:component-name"
                            value={this.state.childName}
                            onChange={this.handleChildNameChange}
                            onKeyPress={this.handleKeyPress}
                        />
                    </p>
                    <div className="control is-grouped">
                        <p className="control">
                            <button
                                className={`button is-primary ${this.state.parentName && this.state.childName ? '' : 'is-disabled'}`}
                                onClick={this.handleSubmit}
                            >Search</button>
                        </p>
                        <p className="control">
                            <button className="button is-link" onClick={this.clear}>Cancel</button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
