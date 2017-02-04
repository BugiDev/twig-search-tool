import React, { Component } from 'react';

export default class PathModal extends Component {

    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this._inp.webkitdirectory = true;
    }

    handleInputChange(event) {
        this.props.inputChange(event.target.files[0].path);
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box">
                        <h1 className="subtitle">Chose your base path to search .twig files</h1>
                        <input type="file" ref={i => this._inp = i} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }
}
