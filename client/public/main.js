const electron = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const { app, BrowserWindow } = electron
let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 450,
        webPreferences: {
            
        }
    })
    mainWindow.setMenu(null)
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`)
    mainWindow.on('closed', () => {
        mainWindow = null
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