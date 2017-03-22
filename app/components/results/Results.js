import React, {Component} from 'react';
import Table from '../table/Table';
import Tree from '../tree/Tree';
import styles from './Results.css';
import ResultsDisplaySwitch from './ResultsDisplaySwitch';

const Config = require('electron-config');

const config = new Config();

export default class Results extends Component {

    static propTypes = {
        results: React.PropTypes.object,
        loading: React.PropTypes.bool
    };

    constructor() {
        super();

        this.state = {
            displayType: 'list'
        };

        this.renderResults = this.renderResults.bind(this);
        this.renderNoResults = this.renderNoResults.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.preparePositiveResults = this.preparePositiveResults.bind(this);
        this.changeDisplayType = this.changeDisplayType.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdateState = false;
        let shouldUpdateProps = false;

        if (nextState.displayType !== this.state.displayType) {
            shouldUpdateState = true;
        }

        if (nextProps.loading !== this.props.loading) {
            shouldUpdateProps = true;
        }

        if (nextProps.results !== this.props.results) {
            shouldUpdateProps = true;
        }

        return (shouldUpdateState || shouldUpdateProps);
    }

    preparePositiveResults() {
        const basePath = config.get('basePath');
        return this.props.results.positives.map((val) => val.slice(basePath.length + 1));
    }

    changeDisplayType(displayType) {
        this.setState({displayType});
    }

    renderResults() {
        return (
            <div>
                <hr />
                <div className="level">
                    <div className="level-left">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Total positives:</p>
                                <p className="title">{this.props.results.positives.length}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Total errors:</p>
                                <p className="title">{this.props.results.errors.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="level-right">
                        <div className="level-item">
                            <ResultsDisplaySwitch changeDisplayType={this.changeDisplayType}/>
                        </div>
                    </div>

                </div>

                {this.state.displayType === 'list' ? <Table results={this.preparePositiveResults()}/> : <Tree results={this.preparePositiveResults()}/>}

            </div>
        );
    }

    renderNoResults() {
        return (
            <div>
                <hr />
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h2 className="subtitle">
                                No results
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    renderLoading() {
        return (
            <div>
                <hr />
                <div className={`uil-ring-css ${styles.centerSpinner}`}>
                    <div />
                </div>
            </div>
        );
    }

    render() {
        let renderElement = null;

        if (this.props.loading) {
            renderElement = this.renderLoading();
        } else {
            if (this.props.results && (this.props.results.errors.length > 0 || this.props.results.positives.length > 0 )) {
                renderElement = this.renderResults();
            } else {
                renderElement = this.renderNoResults();
            }
        }

        return (
            <div>
                {renderElement}
            </div>
        );
    }
}
