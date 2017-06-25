const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const windowStateKeeper = require('electron-window-state');

function createWindow({url}) {

    // Load the previous window state with fallback to defaults
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    let win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        'web-preferences': {
            'web-security': true,
            'allowRunningInsecureContent': false
        }
    });

    // Register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(win);

    const ses = win.webContents.session;

    win.loadURL(url);

    ses.clearCache(() => {});
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null
    });

}

app.on('ready', () => {
    createWindow({url: 'http://localhost:8081/signin.html'});
});

app.on('web-contents-created', (event, webContents) => {
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
