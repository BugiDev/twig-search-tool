import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Pages from './pages/Pages';
import SingleComponent from './pages/singleComponent/SingleComponent';
import MultiComponent from './pages/multiComponent/MultiComponent';
import ComponentWithAttribute from './pages/componentWithAttribute/ComponentWithAttribute';
import ComponentWithAttributeAndValue from './pages/componentWithAttributeAndValue/ComponentWithAttributeAndValue';
import ParentContainsChild from './pages/parentContainsChild/ParentContainsChild';

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
