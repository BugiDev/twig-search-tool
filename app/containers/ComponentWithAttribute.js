import React, {Component} from 'react';
import Results from '../components/results/Results';
import PageTitle from '../components/pageTitle/PageTitle';

const {ipcRenderer} = require('electron');

export default class ComponentWithAttribute extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            componentName: '',
            attributeName: '',
            results: null,
            loading: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.clear = this.clear.bind(this);
        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
        this.handleAttributeNameChange = this.handleAttributeNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('results', this.handleSearchResponse);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('results', this.handleSearchResponse);
    }

    handleSearchResponse(event, arg) {
        this.setState({loading: false, results: arg});
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
        ipcRenderer.send('search', {
            type: 'component-with-attribute',
            data: {
                componentName: this.state.componentName,
                attributeName: this.state.attributeName
            }
        });
        this.setState({loading: true});
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.componentName && this.state.attributeName) {
                this.handleSubmit();
            }
        }
    }

    render() {
        return (
            <div>

                <PageTitle title="Component with Attribute Search" subtitle="Enter a components name and attribute name to search for a component with defined attribute" />

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
                                <button className="button is-link" onClick={this.clear}>Cancel</button>
                            </p>
                        </div>
                    </div>
                </div>

                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}
