import React, { Component } from 'react';
import Results from '../components/results/Results';
import PageTitle from '../components/pageTitle/PageTitle';

export default class ParentContainsChild extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            parentName: '',
            childName: ''
        };

        this.clear = this.clear.bind(this);
        this.handleParentNameChange = this.handleParentNameChange.bind(this);
        this.handleChildNameChange = this.handleChildNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log('submit');
    }

    render() {
        return (
            <div>

                <PageTitle title="Parent Component with Child Component Search" subtitle="Enter a parent component name and child component name to search for a parent component that contains child component" />

                <div className="columns">
                    <div className="column is-one-quarter">
                        <label className="label">Parent Component Name</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="ui:component-name" value={this.state.parentName} onChange={this.handleParentNameChange} />
                        </p>
                        <label className="label">Child Component Name</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="ui:component-name" value={this.state.childName} onChange={this.handleChildNameChange} />
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

                <Results results={['asd']} />
            </div>
        );
    }
}
