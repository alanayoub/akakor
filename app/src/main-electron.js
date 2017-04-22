const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const windowStateKeeper = require('electron-window-state');

function createWindow({local, web}) {

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
        win = null
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

app.on('activate', () => {
  if (win === null) {
      createWindow();
  }
})
