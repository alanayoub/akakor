const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let windows = [];

function createWindow ({url}) {

    const win = new BrowserWindow({width: 800, height: 600});
    const idx = windows.push(win);

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  win.loadURL(url);

  // win.webContents.openDevTools();
  win.on('closed', function () {
    windows.splice(idx, 1);
  });

}

app.on('ready', () => {
    createWindow({url: 'http://www.zoopla.co.uk/'});
    createWindow({url: 'http://binaryoverdose.com/'});
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
