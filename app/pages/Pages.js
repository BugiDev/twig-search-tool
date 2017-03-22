import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Menu from '../components/menu/Menu';
import PageHeader from '../components/pageHeader/PageHeader';
import transitions from '../css/transitions.css';

export default class Pages extends Component {

    render() {
        const path = this.props.location.pathname;
        const segment = path.split('/')[1] || 'root';
        return (
            <div className="full-height">
                <section className="section full-height">
                    <PageHeader />

                    <div className="columns full-height is-fullwidth">
                        <div className="column is-3">
                            <Menu />
                        </div>
                        <div className="column is-9">
                            <ReactCSSTransitionGroup
                                transitionName={transitions}
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                                transitionAppearTimeout={300}
                                transitionAppear
                            >
                                {React.cloneElement(this.props.children, { key: segment })}
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}
