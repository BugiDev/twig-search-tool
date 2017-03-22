import React, {Component} from 'react';
import { Map } from 'immutable';
import Results from '../../components/results/Results';
import PageTitle from '../../components/pageTitle/PageTitle';
import ParentContainsChildHeader from './ParentContainsChildHeader';

const {ipcRenderer} = require('electron');

export default class ParentContainsChild extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            results: null,
            loading: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('results', this.handleSearchResponse);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('results', this.handleSearchResponse);
    }

    handleSearchResponse(event, arg) {
        this.setState({loading: false, results: Map(arg)});
    }

    handleSubmit(parentName, childName) {
        ipcRenderer.send('search', {
            type: 'parent-contains-child',
            data: {
                parentName: parentName,
                childName: childName
            }
        });
        this.setState({loading: true});
    }

    render() {
        return (
            <div className="box is-fullwidth">
                <PageTitle
                    title="Parent Component with Child Component Search"
                    subtitle="Enter a parent component name and child component name to search for a parent component that contains child component"
                />
                <ParentContainsChildHeader onSubmit={this.handleSubmit}/>
                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}
