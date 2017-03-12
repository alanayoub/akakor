import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

const windows = [];

function createWindow({local, web}) {

    const win = new BrowserWindow({
        width: 2000,
        height: 1024,
        'web-preferences': {
            'web-security': false
        }
    });
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

    win.webContents.openDevTools();
    win.on('closed', function () {
        windows.splice(idx, 1);
    });

}

app.on('ready', () => {
    createWindow({local: './src/index.html'});
    // createWindow({web: 'http://www.zoopla.co.uk/'});
    // createWindow({web: 'http://binaryoverdose.com/'});
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
