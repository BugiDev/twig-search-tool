import React, { Component } from 'react';
import styles from './AppInitializing.css';
import PathModal from './PathModal';

const Config = require('electron-config');

const config = new Config();

export default class AppInitializing extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            basePath: config.get('basePath')
        }
        this.basePathSelected = this.basePathSelected.bind(this);
        this.loadingRender = this.loadingRender.bind(this);
    }

    componentDidMount() {
        const me = this;
        setTimeout(() => {
            if (this.state.basePath) {
                this.props.initialized();
            } else {
                me.setState({ showModal: true });
            }
        }, 1000);
    }

    basePathSelected(basePath) {
        this.setState({ showModal: false, basePath });
        config.set('basePath', basePath);
        this.props.initialized();
    }

    loadingRender() {
        if (this.state.basePath) {
            return (
                <div>
                    <br />
                    <h1 className={`subtitle ${styles.basePath}`}>{`Basepath: ${this.state.basePath}`}</h1>
                </div>
            );
        }
        return (
            <div className={`uil-ring-css ${styles.centerSpinner}`}>
                <div />
            </div>
        );
    }

    render() {
        const modalRender = this.state.showModal ? <PathModal inputChange={this.basePathSelected} /> : null;

        return (
            <div className=".container full-height">
                {modalRender}
                <section className="section full-height">
                    <div className="container full-height">
                        <div className={`heading has-text-centered full-height ${styles.centerVertically}`}>
                            <h1 className="title">Initializing app</h1>
                            {this.loadingRender()}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
