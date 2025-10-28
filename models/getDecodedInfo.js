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

    function mapTemplateValues(field, selectedValue) {
        if (!modelMapping || !modelMapping.monitorData[field]) return selectedValue;

        return Object.entries(modelMapping.monitorData[field]).map(([key, value]) => ({
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

    // ✅ Handle `monitorData` (templateA fields)
    if (mappedInfo.monitorData) {
        mappedInfo.monitorData = { ...order.productConfigurationInfo.monitorData };
        if (modelMapping && modelMapping.monitorData) {
            Object.keys(modelMapping.monitorData).forEach(field => {
                if (mappedInfo.monitorData[field] !== undefined) {
                    mappedInfo.monitorData[field] = mapTemplateValues(
                        field,
                        mappedInfo.monitorData[field]
                    );
                }
            });
        }
    }
    if (mappedInfo.templateBData) {
        mappedInfo.templateBData = { ...order.productConfigurationInfo.templateBData };
        if (modelMapping && modelMapping.templateBData) {
            Object.keys(modelMapping.templateBData).forEach(field => {
                if (mappedInfo.templateBData[field] !== undefined) {
                    mappedInfo.templateBData[field] = mapTemplateValues(
                        field,
                        mappedInfo.templateBData[field]
                    );
                }
            });
        }
    }
    if (mappedInfo.templateCData) {
        mappedInfo.templateCData = { ...order.productConfigurationInfo.templateCData };
        if (modelMapping && modelMapping.templateCData) {
            Object.keys(modelMapping.templateCData).forEach(field => {
                if (mappedInfo.templateCData[field] !== undefined) {
                    mappedInfo.templateCData[field] = mapTemplateValues(
                        field,
                        mappedInfo.templateCData[field]
                    );
                }
            });
        }
    }
    if (mappedInfo.templateDData) {
        mappedInfo.templateDData = { ...order.productConfigurationInfo.templateDData };
        if (modelMapping && modelMapping.templateDData) {
            Object.keys(modelMapping.templateDData).forEach(field => {
                if (mappedInfo.templateDData[field] !== undefined) {
                    mappedInfo.templateDData[field] = mapTemplateValues(
                        field,
                        mappedInfo.templateDData[field]
                    );
                }
            });
        }
    }
    if (mappedInfo.templateEData) {
        mappedInfo.templateEData = { ...order.productConfigurationInfo.templateEData };
        if (modelMapping && modelMapping.templateEData) {
            Object.keys(modelMapping.templateEData).forEach(field => {
                if (mappedInfo.templateEData[field] !== undefined) {
                    mappedInfo.templateEData[field] = mapTemplateValues(
                        field,
                        mappedInfo.templateEData[field]
                    );
                }
            });
        }
    }
    if (mappedInfo.templateFData) {
        mappedInfo.templateFData = { ...order.productConfigurationInfo.templateFData };
        if (modelMapping && modelMapping.templateFData) {
            Object.keys(modelMapping.templateFData).forEach(field => {
                if (mappedInfo.templateFData[field] !== undefined) {
                    mappedInfo.templateFData[field] = mapTemplateValues(
                        field,
                        mappedInfo.templateFData[field]
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
            const isNum = schemaPath &&
                schemaPath.instance === "Number" &&
                (!schemaPath.options.enum); // this filters out all the dropdown info stuff :D

            // Modify this to send requirements for number fields as well (i.e., voltage numbers...)
            if (isString || isNum) {
                mappedObject[field] = {
                    value: mappedObject[field],
                    required: isRequired,
                    isString: isString,
                    isNum: isNum,
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
