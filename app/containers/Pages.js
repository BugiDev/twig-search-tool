import React, { Component } from 'react';
import Menu from '../components/menu/Menu';

export default class Pages extends Component {

    render() {
        return (
            <div className="full-height">
                <div className="columns full-height is-fullwidth">
                    <div className="column is-3">
                        <section className="section">
                            <Menu />
                        </section>
                    </div>
                    <div className="column is-9">
                        <section className="section">
                            <div className="box is-fullwidth">
                                {this.props.children}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
