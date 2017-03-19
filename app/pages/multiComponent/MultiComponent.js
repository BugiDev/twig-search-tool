import React, {Component} from 'react';
import Results from '../../components/results/Results';
import PageTitle from '../../components/pageTitle/PageTitle';
import MultiComponentHeader from './MultiComponentHeader';

const {ipcRenderer} = require('electron');

export default class MultiComponent extends Component {

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
        this.setState({loading: false, results: arg});
    }

    handleSubmit(componentName) {
        ipcRenderer.send('search', {
            type: 'multi-component',
            data: {
                componentName: componentName
            }
        });
        this.setState({loading: true});
    }

    render() {
        return (
            <div className="box is-fullwidth">
                <PageTitle
                    title="Multiple Component Search"
                    subtitle="Enter a components name to search for multiple component usage in single file"
                />
                <MultiComponentHeader onSubmit={this.handleSubmit}/>
                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}
