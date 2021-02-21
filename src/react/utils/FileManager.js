const electron = window.require('electron');
const app = electron.remote.app;
const dialog = electron.remote.dialog;
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');

const getFileExtension = (fileName) => {
    let parts = fileName.split('.');
    if (parts.length <= 1) return '';
    return parts[parts.length - 1];
};

const getFileNameFromPath = (path) => {
    const regex = new RegExp(/^.*[\\\/]/)
    return path.replace(regex, '');
};

const isYoutubeURLValid = (url) => {
    return url != null && url.length > 0;
};

const resolvePath = (src) => {
    return path.resolve(src);
};

const getResourcesPath = () => {
    return electron.remote.process.resourcesPath;
}

const readFile = (src) => {
    return new Promise((resolve, reject) => {
        fs.readFile(src, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
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

const showOpenDialog = () => {
    return dialog.showOpenDialog({ properties: ['openFile'] })
};

const isFileImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
};

const openPage = (page) => {
    electron.shell.openExternal(page);
};

const fileManager = {
    isYoutubeURLValid: isYoutubeURLValid,
    showSaveDialog: showSaveDialog,
    getFileExtension: getFileExtension,
    saveFile: saveFile,
    createFolder: createFolder,
    createFile: createFile,
    resolvePath: resolvePath,
    readFile: readFile,
    getResourcesPath: getResourcesPath,
    isFileImage: isFileImage,
    showOpenDialog: showOpenDialog,
    getFileNameFromPath: getFileNameFromPath,
    openPage: openPage
};

export default fileManager;