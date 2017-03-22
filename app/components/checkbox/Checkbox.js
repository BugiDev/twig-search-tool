import React, {PureComponent} from 'react';

export default class Checkbox extends PureComponent {

    render() {
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={(event) => {
                            this.props.onChange(this.props.name, event.target.checked);
                        }}
                    />
                    <span className="cr"><i className="cr-icon fa fa-check"/></span>
                    {this.props.label}
                </label>
            </div>
        );
    }
}
