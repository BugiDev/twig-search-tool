import React, {Component} from 'react';
import Menu from '../components/menu/Menu';
import PageHeader from '../components/pageHeader/PageHeader';

export default class Pages extends Component {

    render() {
        return (
            <div className="full-height">
                <section className="section full-height">
                    <PageHeader />

                    <div className="columns full-height is-fullwidth">
                        <div className="column is-3">
                            <Menu />
                        </div>
                        <div className="column is-9">
                            <div className="box is-fullwidth">
                                {this.props.children}
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}
