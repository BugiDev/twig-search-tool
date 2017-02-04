import React, { Component } from 'react';
import Table from '../table/Table';
import Tree from '../tree/Tree';
import styles from './Results.css';

export default class Results extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list'
        };

        this.renderResults = this.renderResults.bind(this);
        this.renderNoResults = this.renderNoResults.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    renderResults() {
        const modeRender = this.state.mode === 'list' ? <Table /> : <Tree />;
        return (
            <div>
                <hr />
                <div className="level">
                    <div className="level-left" />
                    <div className="level-right">
                        <a
                            className="level-item button is-primary"
                            onClick={() => {
                                this.setState({ mode: 'list' });
                            }}
                        >
                            <span className="icon is-small">
                                <i className="fa fa-list-ul" />
                            </span>
                            <span>List</span>
                        </a>
                        <a
                            className="level-item button is-primary is-outlined"
                            onClick={() => {
                                this.setState({ mode: 'tree' });
                            }}
                        >
                            <span className="icon is-small">
                                <i className="fa  fa-sitemap" />
                            </span>
                            <span>Tree</span>
                        </a>
                    </div>
                </div>

                {modeRender}
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
            if (this.props.results) {
                renderElement = this.props.results.length > 0 ? this.renderResults() : this.renderNoResults();
            }
        }

        return (
            <div>
                {renderElement}
            </div>
        );
    }
}
