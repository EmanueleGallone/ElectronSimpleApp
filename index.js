const electron = require('electron');
var ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;

// .on è come un listener per eventi;
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    console.log("App is now ready!");
});

ipcMain.on('video:submit', (event, path) => {
    //we received the event from the mainWindow
    ffmpeg.ffprobe(path, (err, boh=1) => {
        mainWindow.send('video:metadata', boh);
        //console.log('Video duration is : ' , metadata.format.duration);
    });
});
