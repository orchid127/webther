const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path');
require('dotenv').config();


const createWindow = () => {
  const win = new BrowserWindow({
    width: 435,
    height: 500,
    frame: true,
    resizable: false,
    titleBarStyle: 'hidden',
    contextIsolation: true,
    //...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile(path.join(__dirname, '../src/index.html'))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.disableHardwareAcceleration();

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


ipcMain.handle('get-api-key', async () => {
  return process.env.WEATHER_API_KEY;
});

console.log(process.env.WEATHER_API_KEY);