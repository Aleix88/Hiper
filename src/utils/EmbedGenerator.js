import FileManager from './FileManager';
import {YOUTUBE_TYPE, VIDEO_TYPE, IMG_TYPE} from '../model/MediaTypes';
import { Switch } from 'react-router-dom';

const API_FILE_NAME = "hypervideo.min.js";

const HYPERVIDEO_ID = "HYPERVIDEO_ID";
const HYPERVIDEO_SRC = "HYPERVIDEO_SRC";
const HYPERVIDEO_TYPE = "HYPERVIDEO_TYPE";
const HYPERVIDEO_CONFIG = "HYPERVIDEO_CONFIG";

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

const createTagObject = (tag) => {
    return (
        {
            position: {
                x: tag.x,
                y: tag.y
            },
            timeConfig: {
                timestamp: tag.startTime,
                duration: tag.duration
            },
            color: tag.color,
            plugin: {}
        }
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
    
    return FileManager.readFile(FileManager.getResourcesPath() + '/data/' + API_FILE_NAME)
    .then((apiCode) => {
        return FileManager.createFile(projectPath + '/' + API_FILE_NAME, apiCode);
    })
    .then(() => {
        return FileManager.createFile(projectPath + '/index.html', htmlCode);
    })
    .then(() => {
        return FileManager.createFile(projectPath + '/main.css', CSS_TEMPLATE);
    })
    .then(() => {
        let config = {
            videoTitle: videoSettings.videoTitle,
            size: size,
            tags: []
        };
    
        tagsConfig.forEach(t => {
            const tag = createTagObject(t);
            config.tags.push(tag);
        });

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