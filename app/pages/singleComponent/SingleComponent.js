import React, {Component} from 'react';
import Results from '../../components/results/Results';
import PageTitle from '../../components/pageTitle/PageTitle';
import SingleComponentHeader from './SingleComponentHeader';

const {ipcRenderer} = require('electron');

export default class SingleComponent extends Component {

    constructor() {
        super();
        this.state = {
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
            type: 'single-component',
            data: {
                componentName
            }
        });
        this.setState({loading: true});
    }

    render() {

        console.log('render');

        return (
            <div className="box is-fullwidth">

                <PageTitle title="Single Component Search" subtitle="Enter a components name to search for it" />

                <SingleComponentHeader onSubmit={this.handleSubmit} />

                <Results loading={this.state.loading} results={this.state.results} />
            </div>
        );
    }
}
