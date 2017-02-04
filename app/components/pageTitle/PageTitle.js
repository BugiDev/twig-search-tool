import React, { Component } from 'react';

export default class PageTitle extends Component {

    render() {
        return (
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <div>
                            <p className="title">{this.props.title}</p>
                            <br />
                            <p>{this.props.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="level-right">
                    <a className="button is-primary is-outlined">
                        <span className="icon">
                            <i className="fa fa-cogs" />
                        </span>
                        <span>Settings</span>
                    </a>
                </div>
            </div>
        );
    }
}
