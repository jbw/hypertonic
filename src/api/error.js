const throwInvalidParameterException = () => {
    return new Promise(function () {
        throw new Error('Functions parameters invalid');
    });
};

module.exports = { throwInvalidParameterException };
