const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {

  const win = new BrowserWindow({
    width: 949,
    height: 752,
  })
  
  // win.loadURL(`file://${__dirname}/dist/index.html`)
  win.loadFile('booot/dist/index.html')
  // win.loadURL('/')
  win.webContents.openDevTools({mode:'detach'})
}

app.whenReady().then(() => {
  createWindow()

})

app.commandLine.appendSwitch('enable-features', 'WebSpeechAPI');