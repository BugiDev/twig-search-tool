import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Home.css';
import Menu from './menu/Menu';
import Table from './table/Table';
import Tree from './tree/Tree'

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list'
        };
    }

    render() {
        const modeRender = this.state.mode === 'list' ? <Table/> : <Tree/>;
        return (
            <div className="columns full-height">
                <div className={`column is-one-quarter`}>
                    <section className={`section`}>
                        <Menu/>
                    </section>
                </div>
                <div className="column">
                    <section className="section">
                        <div className="container box">
                            <div>
                                <h1 className="title">Section</h1>
                                <h2 className="subtitle">
                                    A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
                                </h2>
                                <div className="level">
                                    <div className="level-left"/>
                                    <div className="level-right">
                                        <a className="level-item button is-primary"
                                           onClick={() => {
                                               this.setState({mode: 'list'})
                                           }}>
                                            <span className="icon is-small">
                                                <i className="fa fa-list-ul"></i>
                                            </span>
                                            <span>List</span>
                                        </a>
                                        <a className="level-item button is-primary is-outlined"
                                           onClick={() => {
                                               this.setState({mode: 'tree'})
                                           }}>
                                            <span className="icon is-small">
                                                <i className="fa  fa-folder-open-o"></i>
                                            </span>
                                            <span>Tree</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {modeRender}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
