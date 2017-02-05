import React, { Component } from 'react';
import Results from '../components/results/Results';
import PageTitle from '../components/pageTitle/PageTitle';

const { ipcRenderer } = require('electron');

export default class ParentContainsChild extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            parentName: '',
            childName: '',
            results: null,
            loading: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.clear = this.clear.bind(this);
        this.handleParentNameChange = this.handleParentNameChange.bind(this);
        this.handleChildNameChange = this.handleChildNameChange.bind(this);
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
        ipcRenderer.send('search', {
            type: 'parent-contains-child',
            data: {
                parentName: this.state.parentName,
                childName: this.state.childName
            }
        });
        this.setState({loading: true});
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.parentName && this.state.childName) {
                this.handleSubmit();
            }
        }
    }

    render() {
        return (
            <div>

                <PageTitle title="Parent Component with Child Component Search" subtitle="Enter a parent component name and child component name to search for a parent component that contains child component" />

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

                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}
