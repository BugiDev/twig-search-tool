import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Pages from './containers/Pages';
import SingleComponent from './containers/SingleComponent';
import MultiComponent from './containers/MultiComponent';
import ComponentWithAttribute from './containers/ComponentWithAttribute';
import ComponentWithAttributeAndValue from './containers/ComponentWithAttributeAndValue';
import ParentContainsChild from './containers/ParentContainsChild';

export default (
    <Route path="/" component={Pages}>
        <IndexRedirect to="/single-component" />
        <Route path="/single-component" component={SingleComponent} />
        <Route path="/multi-component" component={MultiComponent} />
        <Route path="/component-with-attribute" component={ComponentWithAttribute} />
        <Route path="/component-with-attribute-and-value" component={ComponentWithAttributeAndValue} />
        <Route path="/parent-contains-child" component={ParentContainsChild} />
    </Route>
);
