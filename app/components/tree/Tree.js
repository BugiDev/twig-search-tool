/**
 * Created by bogdanbegovic on 3/20/17.
 */

import React, {Component} from 'react';
import path from 'path';
import TreeView from 'react-treeview';

import TreeFileItem from './TreeFileItem';
import TreeFolderItem from './TreeFolderItem';

const Config = require('electron-config');
const {ipcRenderer} = require('electron');

const config = new Config();

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            tree: {},
            collapsedBookkeeping: {},
            basePath: config.get('basePath')
        };

        this.prepareTreeData = this.prepareTreeData.bind(this);
        this.createTreeData = this.createTreeData.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleFolderClick = this.handleFolderClick.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
    }

    componentWillMount() {
        this.prepareTreeData();
    }

    handleFolderClick(i) {
        const collapsedBookkeeping = this.state.collapsedBookkeeping;
        collapsedBookkeeping[i] = !collapsedBookkeeping[i];
        this.setState({collapsedBookkeeping});
    }

    handleFileClick(i) {
        debugger;
        ipcRenderer.send('open-file', i);
    }

    prepareTreeData() {
        for (let i = 0; i < this.props.results.length; i++) {
            this.createTreeData(this.props.results[i].split(path.sep));
        }
    }

    createTreeData(resultArray) {
        const tree = this.state.tree;
        let root = tree;
        let rootPath = '';
        const collapsedObj = this.state.collapsedBookkeeping;
        for (let i = 0; i < resultArray.length; i++) {
            if (!root[resultArray[i]]) {
                if (i === resultArray.length - 1) {
                    root.push(resultArray[i]);
                } else {
                    if (i === resultArray.length - 2) {
                        root[resultArray[i]] = [];
                    } else {
                        root[resultArray[i]] = {};
                    }
                }
            }
            rootPath += path.sep + resultArray[i];

            collapsedObj[rootPath] = true;
            root = root[resultArray[i]];
        }
        this.setState({tree, collapsedBookkeeping: collapsedObj});
    }

    renderTreeComponent(root, rootName, rootPath) {
        if (Array.isArray(root)) {
            return (
                <TreeView
                    key={rootPath}
                    nodeLabel={<TreeFolderItem name={rootName} handleClick={this.handleFolderClick} />}
                    collapsed={this.state.collapsedBookkeeping[rootPath]}
                    onClick={() => { this.handleFolderClick(rootPath); }}
                >
                    {root.map(entry => <TreeFileItem name={entry} handleClick={this.handleFileClick} path={`${rootPath}/${entry}`} />)}
                </TreeView>
            );
        } else {
            const treeViewArray = [];
            for (const x in root) {
                if (root.hasOwnProperty(x)) {
                    treeViewArray.push(this.renderTreeComponent(root[x], x, rootPath + path.sep + x));
                }
            }
            return (
                <TreeView
                    key={rootPath}
                    nodeLabel={<TreeFolderItem name={rootName} handleClick={this.handleFolderClick} />}
                    collapsed={this.state.collapsedBookkeeping[rootPath]}
                    onClick={() => { this.handleFolderClick(rootPath); }}
                >
                    {treeViewArray}
                </TreeView>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderTreeComponent(this.state.tree, this.state.basePath, '')}
            </div>
        );
    }
}
