import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Tree.css';
import {Treebeard, decorators} from 'react-treebeard';

decorators.Header = (props) => {
    const style = props.style;
    const node = props.node;
    const iconType = props.node.children ? 'folder-o' : 'file-code-o';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};

const style = {
    tree: {
        base: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            color: '#9DA5AB',
            fontSize: '14px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: 'whitesmoke'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-13px 0 0 -4px',
                    height: '10px'
                },
                height: 10,
                width: 10,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#9DA5AB'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                {name: 'child1'},
                {name: 'child2'}
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        {name: 'nested child 1'},
                        {name: 'nested child 2'}
                    ]
                }
            ]
        }
    ]
};

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        } else {
            alert('single');
        }
        this.setState({cursor: node});
    }

    render() {
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
                decorators={decorators}
                style={style}
            />
        );
    }
}
