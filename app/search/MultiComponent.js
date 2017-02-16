const fs = require('fs');
const core = require('twig-search-core');

process.on('message', (payload) => {
    if (payload && payload.filepaths && payload.data) {
        const allFileNames = payload.filepaths;
        const errors = [];
        const positives = [];

        allFileNames.forEach((filepath) => {
            const data = fs.readFileSync(filepath, 'utf8');
            const contains = core.usesComponentMulti(data, payload.data.componentName);

            if (contains.error) {
                errors.push({filepath, message: contains.error});
            }
            if (contains.value) {
                positives.push(filepath);
            }
        });

        process.send({
            errors,
            positives
        });
    }
});
