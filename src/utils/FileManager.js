const electron = window.require('electron');
const app = electron.remote.app;
const dialog = electron.remote.dialog;

const validVideoExtensions = ['mp4'];

const getFileExtension = (fileName) => {
    let parts = fileName.split('.');
    if (parts.length <= 1) return '';
    return parts[parts.length - 1];
};

const isVideoFileValid = (file) => {
    const extension = getFileExtension(file);
    return validVideoExtensions.includes(extension.toLowerCase());
};

const isYoutubeURLValid = (url) => {

};

const showSaveDialog = async (title, onSave) => {
    const options = {
        defaultPath: app.getPath('documents'),
        title: title
    };
    const result = await dialog.showSaveDialog(null, options);
    return [result.filePath, result.canceled];
};

const fileManager = {
    isVideoFileValid: isVideoFileValid,
    isYoutubeURLValid: isYoutubeURLValid,
    showSaveDialog: showSaveDialog
};

export default fileManager;