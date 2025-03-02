const mappings = require("./mappings.js"); // Import mappings
const mongoose = require("mongoose");

const getDecodedInfo = function (order) {
    const modelName = order.productType ? order.productType : null;
    const model = mongoose.model(order.productType);

    const modelMapping = mappings[`${modelName}_Mapping`];

    function mapValues(field, selectedValue) {
        if (!modelMapping[field]) return selectedValue;

        return Object.entries(modelMapping[field]).map(([key, value]) => ({
            key: parseInt(key),
            value: value,
            isSelected: parseInt(key) === selectedValue,
        }));
    }

    let mappedInfo = { ...order.productConfigurationInfo };

    Object.keys(modelMapping).forEach(field => {
        if (mappedInfo[field] !== undefined) {
            mappedInfo[field] = mapValues(field, mappedInfo[field]);
        }
    });
    Object.keys(mappedInfo).forEach(field => {
        const schemaPath = model.schema.path(field); // Get field schema definition
        const isRequired = schemaPath ? schemaPath.isRequired || false : false;
        const isString = schemaPath && schemaPath.instance === "String";
        if (isString) {
            mappedInfo[field] = {
                value: mappedInfo[field],
                required: true,
            };
        }
    });
    return mappedInfo;
};

module.exports = getDecodedInfo;
