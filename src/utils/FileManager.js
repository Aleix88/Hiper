const electron = window.require('electron');
const app = electron.remote.app;
const dialog = electron.remote.dialog;
const fs = electron.remote.require('fs');

const getFileExtension = (fileName) => {
    let parts = fileName.split('.');
    if (parts.length <= 1) return '';
    return parts[parts.length - 1];
};

const isYoutubeURLValid = (url) => {
    return url != null && url.length > 0;
};

const createFolder = (folder) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(folder, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(folder);
            }
        });
    });
};

const createFile = (filePath, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filePath);
            }
        });
    })
};

const saveFile = (from, to) => {
    return new Promise((resolve, reject) => {
            fs.copyFile(from, to, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(to);
                }
            });
    });
};

const showSaveDialog = async (title, nameFieldLabel, buttonLabel, defaultPath) => {
    const options = {
        defaultPath: app.getPath(defaultPath),
        title: title,
        buttonLabel: buttonLabel,
        nameFieldLabel: nameFieldLabel
    };
    const result = await dialog.showSaveDialog(null, options);
    if (result.canceled) {
        return Promise.reject();
    } else {
        return Promise.resolve(result.filePath);
    }
};

const fileManager = {
    isYoutubeURLValid: isYoutubeURLValid,
    showSaveDialog: showSaveDialog,
    getFileExtension: getFileExtension,
    saveFile: saveFile,
    createFolder: createFolder,
    createFile: createFile
};

export default fileManager;