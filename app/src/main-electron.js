var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var path = require('path');
var url = require('url');

const windows = [];

function createWindow({local, web}) {

    const win = new BrowserWindow({
        width: 2000,
        height: 1024,
        'web-preferences': {
            'web-security': false
        }
    });
    const ses = win.webContents.session;
    const idx = windows.push(win);

    if (local) {
        win.loadURL(url.format({
            pathname: path.join(__dirname, local),
            protocol: 'file:',
            slashes: true
        }));
    }
    else {
        win.loadURL(web);
    }

    ses.clearCache(() => {});
    win.webContents.openDevTools();
    win.on('closed', function () {
        windows.splice(idx, 1);
    });

}

app.on('ready', () => {
    createWindow({local: './signin.html'});
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
