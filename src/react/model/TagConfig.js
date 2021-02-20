import Plugin from './Plugin';

class TagConfig {

    constructor(id, name, x, y, startTime) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.startTime = startTime;
        this.duration = 5; //In seconds
        this.color = "#fff";
        this.plugin = new Plugin("", "");
    }

    isVisibleAt(currentTime) {
        return currentTime >= this.startTime && currentTime <= this.startTime + this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color;
    }

    setPlugin(plugin) {
        this.plugin = plugin;
    }

}

export default TagConfig;