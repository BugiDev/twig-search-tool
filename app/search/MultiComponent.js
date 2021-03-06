const fs = require('fs');
const libxmljs = require('libxmljs');

process.on('message', (payload) => {
    if (payload && payload.filepaths && payload.data) {
        const allFileNames = payload.filepaths;
        const errors = [];
        const positives = [];

        allFileNames.forEach((filepath) => {
            const data = fs.readFileSync(filepath, 'utf8');

            try {
                const xmlDoc = libxmljs.parseXml(data);
                const found = xmlDoc.find(`//${payload.data.componentName}`, {ui: 'http://mis.arbor.sc/ui'});
                if (found.length > 1) {
                    positives.push(filepath);
                }
            } catch (e) {
                errors.push({filepath, message: e.message});
            }
        });

        process.send({
            errors,
            positives
        });
    }
});
