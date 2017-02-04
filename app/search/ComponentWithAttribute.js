const fs = require('fs');
const core = require('twig-search-core');

module.exports = (flags, rootPath) => {
    const allFilenames = core.getAllTwigs(rootPath);
    const errors = [];
    const positives = [];

    allFilenames.forEach((filepath) => {
        const data = fs.readFileSync(filepath, 'utf8');
        const contains = core.componentHasAttribute(data, flags.componentName, flags.attributeName);

        if (contains.error) {
            errors.push({ filepath, message: contains.error });
        } else {
            if (contains.value) {
                positives.push(filepath);
            }
        }
    });

    return {
        errors,
        positives
    };
};
