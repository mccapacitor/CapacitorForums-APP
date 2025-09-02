const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    icon: __dirname + '/icon.png',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL("https://www.mccapacitor.org/Forum/index.html");

  win.removeMenu();

  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith("https://www.mccapacitor.org/Forum/")) {
      event.preventDefault();
    }
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith("https://www.mccapacitor.org/Forum/")) {
      return { action: "deny" };
    }
    return { action: "allow" };
  });
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
