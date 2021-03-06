import React, {PureComponent} from 'react';
import MenuItem from './MenuItem';

export default class Menu extends PureComponent {
    render() {
        return (
            <aside className="menu box">
                <p className="menu-label">
                    Search options
                </p>
                <ul className="menu-list">
                    <MenuItem name={'Single Component'} link={'/single-component'} />
                    <MenuItem name={'Multiple Components'} link={'/multi-component'} />
                    <MenuItem name={'Component with attribute'} link={'/component-with-attribute'} />
                    <MenuItem name={'Component with attribute and value'} link={'/component-with-attribute-and-value'} />
                    <MenuItem name={'Parent component with child component'} link={'/parent-contains-child'} />
                </ul>
            </aside>
        );
    }
}
