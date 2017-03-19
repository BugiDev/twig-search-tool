import React, {Component} from 'react';
import Results from '../../components/results/Results';
import PageTitle from '../../components/pageTitle/PageTitle';
import ComponentWithAttributeHeader from './ComponentWithAttributeHeader';

const {ipcRenderer} = require('electron');

export default class ComponentWithAttribute extends Component {

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

    handleSubmit(componentName, attributeName) {
        ipcRenderer.send('search', {
            type: 'component-with-attribute',
            data: {
                componentName: componentName,
                attributeName: attributeName
            }
        });
        this.setState({loading: true});
    }

    render() {
        return (
            <div className="box is-fullwidth">
                <PageTitle
                    title="Component with Attribute Search"
                    subtitle="Enter a components name and attribute name to search for a component with defined attribute"
                />
                <ComponentWithAttributeHeader onSubmi={this.handleSubmit}/>
                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}
