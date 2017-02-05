/**
 * Created by bogdanbegovic on 2/4/17.
 */

const Search = require('./Search');

process.on('message', (payload) => {
    let results = [];

    if (payload && payload.type && payload.basePath) {
        switch (payload.type) {
            case 'single-component':
                results = Search.singleComponent(payload.data, payload.basePath);
                break;
            case 'multi-component':
                results = Search.multiComponent(payload.data, payload.basePath);
                break;
            case 'component-with-attribute':
                results = Search.componentWithAttribute(payload.data, payload.basePath);
                break;
            case 'component-with-attribute-and-value':
                results = Search.componentWithAttributeAndValue(payload.data, payload.basePath);
                break;
            case 'parent-contains-child':
                results = Search.parentContainsChild(payload.data, payload.basePath);
                break;
            default:
                throw new Error('Command not valid or not specified! Use --help to see available commands.');
        }
    }

    process.send(results);
});
