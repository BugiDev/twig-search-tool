import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import routes from '../routes';
import AppInit from '../components/appInit/AppInitializing';
var {ipcRenderer, remote} = require('electron'); 

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      initializing: true
    };

    this.initialized = this.initialized.bind(this);
  }

  componentDidMount() {
    const me = this;
    ipcRenderer.send('test', 1);
  }

  initialized() {
    setTimeout(()=>{
      this.setState({ initializing: false });
    }, 2000);
  }

  render() {
    const appRender = this.state.initializing ? <AppInit initialized={this.initialized} /> : <Router history={hashHistory} routes={routes} />;
    return (
      <div className="full-height">
        {appRender}
      </div>
    );
  }
}
