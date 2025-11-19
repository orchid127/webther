const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 435,
    height: 500,
    frame: true,
    titleBarStyle: 'hidden',
    //...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
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

require('dotenv').config();
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

ipcMain.handle('get-api-key', async () => {
  return API_KEY;
});