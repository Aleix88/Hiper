class TagConfig {

    constructor(id, x, y, startTime) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.startTime = startTime;
        this.duration = 5; //In seconds
        this.name = "";
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

}

export default TagConfig;