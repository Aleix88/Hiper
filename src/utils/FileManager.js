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

const showSaveDialog = () => {
    const options = {
        defaultPath: app.getPath('documents')
    };
    dialog.showSaveDialog(null, options, (path) => {
        console.log(path);
    });
};

const fileManager = {
    isVideoFileValid: isVideoFileValid,
    isYoutubeURLValid: isYoutubeURLValid,
    showSaveDialog: showSaveDialog
};

export default fileManager;