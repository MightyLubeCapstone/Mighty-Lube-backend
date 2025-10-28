const express = require("express");
const { authenticate } = require("./sessions");
const FGCO = require("../models/fgco");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    //used for FGCO form
    try {
        const { fgcoData, numRequested } = req.body;
        const order = new FGCO({
            conveyorName: fgcoData.conveyorSystemName,
            chainSize: fgcoData.conveyorChainSize,
            ...(fgcoData.otherChainSize && { otherChainSize: fgcoData.otherChainSize }),
            chainManufacturer: fgcoData.chainManufacturer,
            ...(fgcoData.otherManufacturerSize && { otherManufacturerSize: fgcoData.otherManufacturerSize }),
            conveyorLoaded: fgcoData.conveyorLoaded,
            ...(fgcoData.dripLine && { dripLineStatus: fgcoData.dripLine }),
            operatingVoltTriple: fgcoData.operatingVoltTriple,
            oppsSpecification: fgcoData.installationClearance,
            pushButtonSwitch: fgcoData.pushButton,
            ...(fgcoData.enclosedShroud && { enclosedShroud: fgcoData.enclosedShroud }),
            ...(fgcoData.additionalOtherInfo && { additionalOtherInfo: fgcoData.additionalOtherInfo }),
        });
        req.user.cart.push({ numRequested: numRequested, productConfigurationInfo: order, productType: "FGCO" });
        await req.user.save();

        return res.status(200).json({ message: "FGCO entry added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Only doing for FGCO for now incase you want changed or dont likey

// router.get("/mapped", authenticate, async (req, res) => {
//     try {
//         const { orderID } = req.body;
//         const user = req.user;

//         const order = user.orders.find(order => order.orderID === orderID);
//         if (!order) {
//             return res.status(400).json({ error: "No order found with that ID!" });
//         }



//         return res.status(200).json({
//             mappedDetails: mappedInfo
//         });

//     } catch (error) {
//         console.error("Error fetching mapped FGCO order:", error);
//         res.status(500).json({ error: `Internal server error: ${error.message}` });
//     }
// });



module.exports = router;