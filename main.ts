const { app, BrowserWindow } = require('electron');
try {
  require('electron-reloader')(module);
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
    },
  });

  win.loadFile('./build/index.html');

  // Open the DevTools.
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
