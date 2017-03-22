import {app, BrowserWindow, Menu, ipcMain} from 'electron';

const Config = require('electron-config');
const cp = require('child_process');
const cmd = require('node-cmd');

const config = new Config();

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    const path = require('path'); // eslint-disable-line
    const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
    require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async() => {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

        const extensions = [
            'REACT_DEVELOPER_TOOLS'
        ];

        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

        // TODO: Use async interation statement.
        //       Waiting on https://github.com/tc39/proposal-async-iteration
        //       Promises will fail silently, which isn't what we want in development
        return Promise
            .all(extensions.map(name => installer.default(installer[name], forceDownload)))
            .catch(console.log);
    }
};

app.on('ready', async() => {
    await installExtensions();

    mainWindow = new BrowserWindow({
        show: false,
        width: 1280,
        height: 800,
        minWidth: 1280,
        minHeight: 800,
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.maximize();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.setMenu(null);

    if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools();
        mainWindow.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.inspectElement(x, y);
                }
            }]).popup(mainWindow);
        });
    }
});

function preparePositiveResults(positives) {
    const basePath = config.get('basePath');
    return positives.map((val) => val.slice(basePath.length + 1));
}

ipcMain.on('search', (event, arg) => {

    console.time('search');

    const basePath = config.get('basePath');

    const child = cp.fork('./app/search/worker');

    child.on('message', (results) => {
        // Receive results from child process
        results.positives.sort();
        results.positives = preparePositiveResults(results.positives);
        results.errors.sort();
        event.sender.send('results', results);
        console.timeEnd('search');
    });

    child.on('exit', () => {
        child.kill();
    });

    // Send child process some work
    child.send({
        type: arg.type,
        basePath,
        data: arg.data
    });
});

ipcMain.on('open-file', (event, arg) => {
    const ide = config.get('ide');
    const basePath = config.get('basePath');
    for (let x in ide) {
        if (ide[x]) {
            openFile(x, basePath + arg);
        }
    }
});

function openFile(type, filePath) {
    switch (type) {
        case 'phpStorm':
            cmd.run(`pstorm ${filePath}`);
            break;
        case 'vscode':
            cmd.run(`code ${filePath}`);
            break;
        case 'atom':
            cmd.run(`atom ${filePath}`);
            break;
        case 'brackets':
            cmd.run(`brackets ${filePath}`);
            break;
        case 'sublime':
            cmd.run(`subl ${filePath}`);
            break;
        case 'notepad':
            cmd.run(`notepad++ ${filePath}`);
            break;
        case 'netbeans':
            cmd.run(`netbeans --open ${filePath}`);
            break;
        default:
            break;
    }
}
