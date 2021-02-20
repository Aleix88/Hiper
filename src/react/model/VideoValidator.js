
const titleValidator = (value) => {
    return value != null && value.length > 0;
};

const sizeValidator = (value) => {
    return value != null && !isNaN(value) && parseInt(value) >= 0;
}

const validators = {
    videoTitle: titleValidator,
    width: sizeValidator,
    height: sizeValidator
};

const validate = (tagConfig, attribute) => {
    return validators[attribute](tagConfig[attribute]);
};

export default validate;