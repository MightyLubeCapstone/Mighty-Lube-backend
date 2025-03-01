const mappings = require("./mappings.js"); // Import mappings

const getDecodedInfo = function (order) {
    const modelName = order.productType ? order.productType.toLowerCase() : null;

    const modelMapping = mappings[`${modelName}_Mapping`]; 

    function mapValues(field, selectedValue) {
        if (!modelMapping[field]) return selectedValue;

        return Object.entries(modelMapping[field]).map(([key, value]) => ({
            key: parseInt(key),
            value: value,
            isSelected: parseInt(key) === selectedValue
        }));
    }

    let mappedInfo = { ...order.productConfigurationInfo };
    Object.keys(modelMapping).forEach(field => {
        if (mappedInfo[field] !== undefined) {
            mappedInfo[field] = mapValues(field, mappedInfo[field]);
        }
    });

    return mappedInfo;
};

module.exports = getDecodedInfo;
