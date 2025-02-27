const express = require("express");
const { dbConnect } = require("../config/config");
const { authenticate } = require("./sessions");
const FGCO = require("../models/fgco");
const fgcoMapping = require("../models/fgcoMapping"); // Adjust the path if needed


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { fgcoData, numRequested } = req.body;
        const order = new FGCO({
            conveyorName: fgcoData.conveyorSystemName,
            chainSizeType: fgcoData.conveyorChainSize,
            ...(fgcoData.otherChainSize && { otherChainSize: fgcoData.otherChainSize }),
            chainManufacturerType: fgcoData.chainManufacturer,
            ...(fgcoData.otherManufacturerSize && { otherManufacturerSize: fgcoData.otherManufacturerSize }),
            loadedStatus: fgcoData.conveyorLoaded,
            dripLineStatus: fgcoData.dripLine,
            operatingVoltTriple: fgcoData.operatingVoltTriple,
            oppsSpecification: fgcoData.installationClearance,
            pushButtonSwitch: fgcoData.pushButton,
            ...(fgcoData.enclosedShroud && { enclosedShroud: fgcoData.enclosedShroud }),
            ...(fgcoData.additionalOtherInfo && { additionalOtherInfo: fgcoData.additionalOtherInfo }),
        });
        req.user.orders.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGCO" });
        await req.user.save();

        return res.status(200).json({ message: "FGCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Only doing for FGCO for now incase you want changed or dont likey

router.get("/mapped", authenticate, async (req, res) => {
    try {
        const { orderID } = req.body; 
        const user = req.user; 

        const order = user.orders.find(order => order.orderID === orderID);
        if (!order) {
            return res.status(400).json({ error: "No order found with that ID!" });
        }

        function mapValues(field, selectedValue) {
            if (!fgcoMapping[field]) return selectedValue;
            return Object.entries(fgcoMapping[field]).map(([key, value]) => [
                parseInt(key),
                value,
                parseInt(key) === selectedValue
            ]);
        }

        let mappedInfo = { ...order.productConfigurationInfo };
        Object.keys(fgcoMapping).forEach(field => {
            if (mappedInfo[field] !== undefined) {
                mappedInfo[field] = mapValues(field, mappedInfo[field]);
            }
        });

        return res.status(200).json({
            mappedDetails: mappedInfo
        });

    } catch (error) {
        console.error("Error fetching mapped FGCO order:", error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});



module.exports = router;