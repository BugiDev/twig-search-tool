import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Menu.css';

export default class Menu extends Component {
  render() {
    return (
        <aside className="menu box">
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><a className="is-active">Dashboard</a></li>
                <li><a>Customers</a></li>
            </ul>
        </aside>
    );
  }
}
