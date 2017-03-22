/**
 * Created by bogdanbegovic on 3/20/17.
 */
import React, {PureComponent} from 'react';

export default class ResultsDisplaySwitch extends PureComponent {

    static propTypes = {
        changeDisplayType: React.PropTypes.func
    };

    constructor() {
        super();

        this.state = {
            displayType: 'list'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(displayType) {
        this.setState({displayType});
        this.props.changeDisplayType(displayType);
    }

    render() {
        return (
            <div className="control is-grouped">
                <p className="control">
                    <button
                        className={`button is-primary ${this.state.displayType === 'list' ? 'is-active' : 'is-outlined'}`}
                        onClick={this.handleSubmit.bind(this, 'list')}
                    >
                        List
                    </button>
                </p>
                <p className="control">
                    <button
                        className={`button is-primary ${this.state.displayType === 'tree' ? 'is-active' : 'is-outlined'}`}
                        onClick={this.handleSubmit.bind(this, 'tree')}
                    >
                        Tree
                    </button>
                </p>
            </div>
        );
    }
}
