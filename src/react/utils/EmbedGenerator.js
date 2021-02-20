import FileManager from './FileManager';
import {YOUTUBE_TYPE, VIDEO_TYPE, IMG_TYPE} from '../model/MediaTypes';
const dJSON = window.require('dirty-json');

const API_FILE_NAME = "hypervideo.min.js";

const HYPERVIDEO_ID = "HYPERVIDEO_ID";
const HYPERVIDEO_SRC = "HYPERVIDEO_SRC";
const HYPERVIDEO_TYPE = "HYPERVIDEO_TYPE";
const HYPERVIDEO_CONFIG = "HYPERVIDEO_CONFIG";
const PLUGIN_IMPORTS = "PLUGIN_IMPORTS";

const CSS_TEMPLATE = `
.hypervideo {
	margin: 1em auto;
    display: block;
}
`;

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html>

    <head>
        <title>Hypervideo</title>
        <meta charset="utf-8">
        <link href="./main.css" rel="stylesheet"/>
        <script src="./hypervideo.min.js"></script>
        ${PLUGIN_IMPORTS}
        <script src="./main.js"></script>
    </head>
    <body>
        <div id="${HYPERVIDEO_ID}" class="hypervideo"></div>
    </body>
</html>
`;

const JS_TEMPLATE = `
document.addEventListener("DOMContentLoaded", () => {

    const config = ${HYPERVIDEO_CONFIG};

    const hypervideo = new Hypervideo("${HYPERVIDEO_SRC}", ${HYPERVIDEO_TYPE}, "${HYPERVIDEO_ID}");
    hypervideo.setupHypervideo(config);

});
`;

const createTagObject = (tag, projectPath) => {

    let tagConfig = {
        position: {
            x: tag.x,
            y: tag.y
        },
        timeConfig: {
            timestamp: tag.startTime,
            duration: tag.duration
        },
        color: tag.color
    };
    
    return (
        
        tag.plugin.path != null && tag.plugin.path.length > 0 ? 
        
        FileManager.readFile(tag.plugin.path)
        .then ((pluginCode) => {
            const pluginName = FileManager.getFileNameFromPath(tag.plugin.path);
            return FileManager.createFile(projectPath + '/' + pluginName, pluginCode);
        })
        .then(() => {
            const pluginConfig = tag.plugin.config != null && tag.plugin.config.length > 0 ? dJSON.parse(tag.plugin.config) : ""; // Remove start and end semicolons
            tagConfig.plugin = {
                name: FileManager.getFileNameFromPath(tag.plugin.name),
                config: pluginConfig
            };
            return tagConfig;
        })
        .catch((err) => {
            return Promise.reject(err)
        })

        :

        Promise.resolve(tagConfig)
    );
};

const getHypervideoType = (mediaType) => {
    switch(mediaType) {
        case YOUTUBE_TYPE:
            return "Hypervideo.YOUTUBE_TYPE";
        case VIDEO_TYPE: 
            return "Hypervideo.VIDEO_TYPE";
        case IMG_TYPE:
            return "Hypervideo.IMAGE_TYPE";
        default: 
            return "Error Type";
    }
};

const generateEmbed = (videoSettings, tagsConfig, projectPath, media, mediaType) => {
    const hypervideo_id = "hypervideo_id";
    const htmlCode = HTML_TEMPLATE.replace(HYPERVIDEO_ID, hypervideo_id);
    const size = {width: videoSettings.width, height: videoSettings.height};
    console.log(FileManager.getResourcesPath());
    return FileManager.readFile(FileManager.getResourcesPath() + '/libs/' + API_FILE_NAME)
    .then((apiCode) => {
        return FileManager.createFile(projectPath + '/' + API_FILE_NAME, apiCode);
    })
    .then(() => {
        const pluginsImports = tagsConfig.reduce((imports, tag, index) => {
            const newScript = `<script src="./${FileManager.getFileNameFromPath(tag.plugin.path)}"></script>`;
            if (imports.includes(newScript)) return imports;
            return index === 0 ? newScript : imports + "\n\t\t" + newScript;
        }, '');
        return FileManager.createFile(projectPath + '/index.html', htmlCode.replace(PLUGIN_IMPORTS, pluginsImports));
    })
    .then(() => {
        return FileManager.createFile(projectPath + '/main.css', CSS_TEMPLATE);
    })
    .then(() => {
        const tagPromises = tagsConfig.map(t => createTagObject(t, projectPath));
        return Promise.all(tagPromises);
    })
    .then((tags) => {
        let config = {
            videoTitle: videoSettings.videoTitle,
            size: size,
            tags: tags
        };
        const hypervideoType = getHypervideoType(mediaType);
        const jsMain = JS_TEMPLATE
        .replace(HYPERVIDEO_ID, hypervideo_id)
        .replace(HYPERVIDEO_SRC, mediaType === YOUTUBE_TYPE ? media : "./" + media.name)
        .replace(HYPERVIDEO_TYPE, hypervideoType)
        .replace(HYPERVIDEO_CONFIG, JSON.stringify(config));
        return FileManager.createFile(projectPath + '/main.js', jsMain);
    });
};



export default generateEmbed;