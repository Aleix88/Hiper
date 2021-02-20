
const nameValidator = (value) => {
    return value != null && value.length > 0;
};

const coordinateValidator = (value) => {
    return value != null && !isNaN(value) && parseInt(value) >= 0 && parseInt(value) <= 100;
}

const timeValidator = (value) => {
    return value != null;
};

const colorValidator = (value) => {
    return value != null && (/^#[0-9A-F]{6}$/i).test(value);

};

const validators = {
    name: nameValidator,
    x: coordinateValidator,
    y: coordinateValidator,
    startTime: timeValidator,
    duration: timeValidator,
    color: colorValidator
};

const validate = (tagConfig, attribute) => {
    return validators[attribute](tagConfig[attribute]);
};

export default validate;