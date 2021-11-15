const electron = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const { app, BrowserWindow, ipcMain } = electron
const ipc = ipcMain
let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 450,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // mainWindow.setMenu(null)
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`)
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    ipc.on('minimizeApp', () => {
        mainWindow.minimize()
    })
    ipc.on('maximizeApp', () => {
        if (mainWindow.isMaximized()){
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })
    ipc.on('closeApp', () => {
        mainWindow.close()
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})
app.on('activate', () => {
    if (mainWindow === null){
        createWindow()
    }
})