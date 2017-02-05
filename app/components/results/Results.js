import React, {Component} from 'react';
import Table from '../table/Table';
import styles from './Results.css';

export default class Results extends Component {

    constructor() {
        super();

        this.renderResults = this.renderResults.bind(this);
        this.renderNoResults = this.renderNoResults.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
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
                </div>
                <Table results={this.props.results.positives} />
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
