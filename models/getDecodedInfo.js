const mappings = require("./mappings.js"); // Import mappings
const mongoose = require("mongoose");

const getDecodedInfo = function (order) {
    const modelName = order.productType ? order.productType : null;
    const model = mongoose.model(order.productType);

    const modelMapping = mappings[`${modelName}_Mapping`];

    function mapValues(field, selectedValue) {
        if (!modelMapping || !modelMapping[field]) return selectedValue;

        return Object.entries(modelMapping[field]).map(([key, value]) => ({
            key: parseInt(key),
            value: value,
            isSelected: parseInt(key) === selectedValue,
        }));
    }

    let mappedInfo = { ...order.productConfigurationInfo };

    // ✅ Map top-level fields
    if (modelMapping) {
        Object.keys(modelMapping).forEach(field => {
            if (mappedInfo[field] !== undefined) {
                mappedInfo[field] = mapValues(field, mappedInfo[field]);
            }
        });
    }

    // ✅ Handle `monitorData` (templateB fields)
    if (order.monitorData) {
        mappedInfo.monitorData = { ...order.monitorData };

        if (modelMapping && modelMapping.monitorData) {
            Object.keys(modelMapping.monitorData).forEach(field => {
                if (mappedInfo.monitorData[field] !== undefined) {
                    mappedInfo.monitorData[field] = mapValues(
                        field,
                        mappedInfo.monitorData[field]
                    );
                }
            });
        }
    }

    // ✅ Add `required` metadata for both top-level and `monitorData` fields
    function addRequiredMetadata(mappedObject, schema) {
        Object.keys(mappedObject).forEach(field => {
            const schemaPath = schema.path(field);
            const isRequired = schemaPath ? schemaPath.isRequired || false : false;
            const isString = schemaPath && schemaPath.instance === "String";

            if (isString) {
                mappedObject[field] = {
                    value: mappedObject[field],
                    required: isRequired,
                };
            }
        });
    }

    addRequiredMetadata(mappedInfo, model.schema); // Apply to top-level fields

    if (mappedInfo.monitorData) {
        addRequiredMetadata(mappedInfo.monitorData, model.schema.path("monitorData").schema); // Apply to `monitorData`
    }

    return mappedInfo;
};

module.exports = getDecodedInfo;
