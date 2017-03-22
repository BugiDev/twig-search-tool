import React, {PureComponent} from 'react';

export default class ComponentWithAttributeHeader extends PureComponent {

    constructor() {
        super();
        this.state = {
            componentName: '',
            attributeName: ''
        };
        this.clear = this.clear.bind(this);
        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
        this.handleAttributeNameChange = this.handleAttributeNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    clear() {
        this.setState({
            componentName: '',
            attributeName: ''
        });
    }

    handleComponentNameChange(event) {
        this.setState({componentName: event.target.value});
    }

    handleAttributeNameChange(event) {
        this.setState({attributeName: event.target.value});
    }

    handleSubmit() {
        if (this.state.componentName && this.state.attributeName) {
            this.props.onSubmit(this.state.componentName, this.state.attributeName);
        }
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.componentName && this.state.attributeName) {
                this.props.onSubmit(this.state.componentName, this.state.attributeName);
            }
        }
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
                    <label className="label">Attribute Name</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="attribute"
                            value={this.state.attributeName}
                            onChange={this.handleAttributeNameChange}
                            onKeyPress={this.handleKeyPress}
                        />
                    </p>
                    <div className="control is-grouped">
                        <p className="control">
                            <button
                                className={`button is-primary ${this.state.componentName && this.state.attributeName ? '' : 'is-disabled'}`}
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
