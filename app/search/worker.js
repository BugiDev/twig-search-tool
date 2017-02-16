/**
 * Created by bogdanbegovic on 2/4/17.
 */
const cp = require('child_process');
const core = require('twig-search-core');
const numCPUs = require('os').cpus().length;

const allWorkers = [];
const totalResults = {
    positives: [],
    errors: []
};

process.on('message', (payload) => {
    if (payload && payload.type && payload.basePath) {
        const allFileNames = core.getAllTwigs(payload.basePath);

        switch (payload.type) {
            case 'single-component':
                createWorkers('./app/search/SingleComponent', payload, allFileNames, allWorkers);
                break;
            case 'multi-component':
                createWorkers('./app/search/MultiComponent', payload, allFileNames, allWorkers);
                break;
            case 'component-with-attribute':
                createWorkers('./app/search/ComponentWithAttribute', payload, allFileNames, allWorkers);
                break;
            case 'component-with-attribute-and-value':
                createWorkers('./app/search/ComponentWithAttributeAndValue', payload, allFileNames, allWorkers);
                break;
            case 'parent-contains-child':
                createWorkers('./app/search/ParentContainsChild', payload, allFileNames, allWorkers);
                break;
            default:
                throw new Error('Command not valid or not specified! Use --help to see available commands.');
        }
    }
});

function createWorkers(workerPath, payload, allFileNames, workers) {
    let workersRef = workers;
    for (let i = 0; i < numCPUs; i++) {
        const worker = cp.fork(workerPath);
        workersRef.push(worker);

        worker.on('message', (workerResults) => {
            totalResults.positives = totalResults.positives.concat(workerResults.positives);
            totalResults.errors = totalResults.errors.concat(workerResults.errors);
            worker.kill();

            const tmpChildren = [];

            for (let k = 0; k < workersRef.length; k++) {
                if (workersRef[k].pid !== worker.pid) {
                    tmpChildren.push(workersRef[k]);
                }
            }
            workersRef = tmpChildren;

            if (!workersRef.length) {
                process.send(totalResults);
            }
        });

        const partLength = Math.floor(allFileNames.length / numCPUs);
        let workerPaths;
        if (i !== numCPUs - 1) {
            workerPaths = allFileNames.slice(i * partLength, partLength * (i + 1));
        } else {
            workerPaths = allFileNames.slice(i * partLength, allFileNames.length - 1);
        }

        worker.send({
            filepaths: workerPaths,
            data: payload.data
        });
    }
}
