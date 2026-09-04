const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnect } = require("./config/config");
const { name: packageName, version: backendVersion } = require("./package.json");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(bodyParser.json());
app.use(cors());


// ============================================================
// DASHBOARD ROUTES
// ============================================================

const user_orders = require("./routes/user_orders");
const orders = require("./routes/orders");
const rfq = require("./routes/rfq");
const adminRoute = require("./routes/admin");


// ============================================================
// COMMON / PAGE ROUTES
// ============================================================

const { sessionsRoute } = require("./routes/sessions");
const usersRoute = require("./routes/users");
const configurationsRoute = require("./routes/configurations");
const draftsRoute = require("./routes/drafts");
const emailRoute = require("./routes/email");
const cartRoute = require("./routes/cart");
const fglmRoute = require("./routes/fglm");
const fgcoRoute = require("./routes/fgco");


// ============================================================
// CC5
// ============================================================

const cc5clRoute = require("./routes/CC5_CL");
const cc5op4OeRoute = require("./routes/CC5_OP4OE");


// ============================================================
// CATERPILLAR DRIVE
// ============================================================

const coeCdlRoute = require("./routes/COE_CDL");
const coeCelRoute = require("./routes/COE_CEL");
const coeOp4oeRoute = require("./routes/COE_OP4OE");


// ============================================================
// ETIPO
// ============================================================

const eti807Route = require("./routes/ETI_807");
const eti9000invlRoute = require("./routes/ETI_9000INVL");
const eti91Route = require("./routes/ETI_91");
const etiOp48eRoute = require("./routes/ETI_OP48E");


// ============================================================
// ETOPO
// ============================================================

const eto2100Route = require("./routes/ETO_2100");
const eto9000eRoute = require("./routes/ETO_9000E");
const etoOp48eRoute = require("./routes/ETO_OP48E");
const etoPmlmsRoute = require("./routes/ETO_PMLMS");
const etoMlaioRoute = require("./routes/ETO_MLAIO");


// ============================================================
// FREE CARRIER
// ============================================================

const fc314Route = require("./routes/FC_314");
const fc317Route = require("./routes/FC_317");


// ============================================================
// C CHANNEL OVERHEAD OR INVERTED
// ============================================================

const fro314Route = require("./routes/FRO_314");
const fro317Route = require("./routes/FRO_317");
const fro9000fRoute = require("./routes/FRO_9000F");
const froEsRoute = require("./routes/FRO_ES");
const froOebRoute = require("./routes/FRO_OEB");
const froOp139aRoute = require("./routes/FRO_OP139A");


// ============================================================
// FLAT TOP
// ============================================================

const ftFtlRoute = require("./routes/FT_FTL");
const ftOp40eRoute = require("./routes/FT_OP40E");
const ftOpcoRoute = require("./routes/FT_OPCO");
const ftMlcelRoute = require("./routes/FT_MLCEL");


// ============================================================
// IN FLOOR TOW LINE
// ============================================================

const iftIftlRoute = require("./routes/IFT_IFTL");
const iftOp4oeRoute = require("./routes/IFT_OP4OE");


// ============================================================
// IN-BOARD ROLLER CHAIN
// ============================================================

const ibrRfcRoute = require("./routes/IBR_RFC");
const ibrOp4oeRoute = require("./routes/IBR_OP4OE");


// ============================================================
// OVERHEAD POWER RAIL - CLEANING SYSTEMS
// ============================================================

const ohCcsIbeamRoute = require("./routes/OH_CCS_IBEAM");
const ohCcsOp13Route = require("./routes/OH_CCS_OP13");
const ohCcsBrushRoute = require("./routes/OH_CCS_BRUSH");
const ohCcs3000Route = require("./routes/OH_CCS_3000");
const ohCcsOp8Route = require("./routes/OH_CCS_OP8");
const ohCcsOp8npRoute = require("./routes/OH_CCS_OP8NP");
const ohCcsO55Route = require("./routes/OH_CCS_O55");
const ohCcsCleaningBrushRoute = require("./routes/OH_CCS_CLEANING_BRUSH");


// ============================================================
// OVERHEAD POWER RAIL - LUBRICATION / MONITORING
// ============================================================

const ohpGpcRoute = require("./routes/OHP_GPC");
const ohp2100iRoute = require("./routes/OHP_2100I");
const ohp9000iRoute = require("./routes/OHP_9000I");
const ohpCdlRoute = require("./routes/OHP_CDL");
const ohpEsRoute = require("./routes/OHP_ES");
const ohpOp4aRoute = require("./routes/OHP_OP4A");
const ohpOp52Route = require("./routes/OHP_OP52");
const ohpOp139aRoute = require("./routes/OHP_OP139A");

// Multi Line (Permanent) ALL IN ONE Monitoring + Lubrication
// Product ID: OHP_MLP
const ohpMlpRoute = require("./routes/OHP_MLP");

// Portable (Multi-Line) Mighty Lube Monitoring System
// Product ID: OHP_PML
const ohpPmlRoute = require("./routes/OHP_PML");

// Single Line (Stationary) Mighty Lube Monitoring System
// Product ID: OHP_001
const ohp001Route = require("./routes/OHP_001");

// Paint Marker for Monitoring System (Optional)
// Product ID: OHP_PMM
const ohpPmmRoute = require("./routes/OHP_PMM");


// ============================================================
// DASHBOARD ROUTE USAGE
// ============================================================

app.use("/api/user_orders", user_orders);
app.use("/api/orders", orders);
app.use("/api/rfq", rfq);
app.use("/api/admin", adminRoute);


// ============================================================
// COMMON ROUTE USAGE
// ============================================================

app.use("/api/cart", cartRoute);
app.use("/api/configurations", configurationsRoute);
app.use("/api/drafts", draftsRoute);
app.use("/api/email", emailRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/users", usersRoute);
app.use("/api/fglm", fglmRoute);
app.use("/api/fgco", fgcoRoute);


// ============================================================
// CC5 ROUTES
// ============================================================

app.use("/api/cc5_cl", cc5clRoute);
app.use("/api/cc5_op40e", cc5op4OeRoute);


// ============================================================
// CATERPILLAR DRIVE ROUTES
// ============================================================

app.use("/api/coe_cdl", coeCdlRoute);
app.use("/api/coe_cel", coeCelRoute);
app.use("/api/coe_op4oe", coeOp4oeRoute);


// ============================================================
// ETIPO ROUTES
// ============================================================

app.use("/api/eti_807", eti807Route);
app.use("/api/eti_9000invl", eti9000invlRoute);
app.use("/api/eti_91", eti91Route);
app.use("/api/eti_op48e", etiOp48eRoute);


// ============================================================
// ETOPO ROUTES
// ============================================================

app.use("/api/eto_2100", eto2100Route);
app.use("/api/eto_9000e", eto9000eRoute);
app.use("/api/eto_op48e", etoOp48eRoute);
app.use("/api/eto_pmlms", etoPmlmsRoute);
app.use("/api/eto_mlaio", etoMlaioRoute);


// ============================================================
// FREE CARRIER ROUTES
// ============================================================

app.use("/api/fc_314", fc314Route);
app.use("/api/fc_317", fc317Route);


// ============================================================
// C CHANNEL OVERHEAD OR INVERTED ROUTES
// ============================================================

app.use("/api/fro_314", fro314Route);
app.use("/api/fro_317", fro317Route);
app.use("/api/fro_9000f", fro9000fRoute);
app.use("/api/fro_es", froEsRoute);
app.use("/api/fro_oeb", froOebRoute);
app.use("/api/fro_op139a", froOp139aRoute);


// ============================================================
// FLAT TOP ROUTES
// ============================================================

app.use("/api/ft_ftl", ftFtlRoute);
app.use("/api/ft_op40e", ftOp40eRoute);
app.use("/api/ft_opco", ftOpcoRoute);
app.use("/api/ft_mlcel", ftMlcelRoute);


// ============================================================
// IN FLOOR TOW LINE ROUTES
// ============================================================

app.use("/api/ift_iftl", iftIftlRoute);
app.use("/api/ift_op4oe", iftOp4oeRoute);


// ============================================================
// IN-BOARD ROLLER CHAIN ROUTES
// ============================================================

app.use("/api/ibr_rfc", ibrRfcRoute);
app.use("/api/ibr_op4oe", ibrOp4oeRoute);


// ============================================================
// OVERHEAD POWER RAIL - CLEANING SYSTEM ROUTES
// ============================================================

app.use("/api/oh_ccs_ibeam", ohCcsIbeamRoute);
app.use("/api/oh_ccs_op13", ohCcsOp13Route);
app.use("/api/oh_ccs_brush", ohCcsBrushRoute);
app.use("/api/oh_ccs_3000", ohCcs3000Route);
app.use("/api/oh_ccs_op8", ohCcsOp8Route);
app.use("/api/oh_ccs_op8np", ohCcsOp8npRoute);
app.use("/api/oh_ccs_o55", ohCcsO55Route);
app.use("/api/oh_ccs_cleaning_brush", ohCcsCleaningBrushRoute);


// ============================================================
// OVERHEAD POWER RAIL - LUBRICATION / MONITORING ROUTES
// ============================================================

app.use("/api/ohp_gpc", ohpGpcRoute);
app.use("/api/ohp_2100i", ohp2100iRoute);
app.use("/api/ohp_9000i", ohp9000iRoute);
app.use("/api/ohp_cdl", ohpCdlRoute);
app.use("/api/ohp_es", ohpEsRoute);
app.use("/api/ohp_op4a", ohpOp4aRoute);
app.use("/api/ohp_op52", ohpOp52Route);
app.use("/api/ohp_op139a", ohpOp139aRoute);

// Multi Line (Permanent) ALL IN ONE Monitoring + Lubrication
// Product ID: OHP_MLP
// POST /api/ohp_mlp
app.use("/api/ohp_mlp", ohpMlpRoute);

// Portable (Multi-Line) Mighty Lube Monitoring System
// Product ID: OHP_PML
// POST /api/ohp_pml
app.use("/api/ohp_pml", ohpPmlRoute);

// Single Line (Stationary) Mighty Lube Monitoring System
// Product ID: OHP_001
// POST /api/ohp_001
app.use("/api/ohp_001", ohp001Route);

// Paint Marker for Monitoring System (Optional)
// Product ID: OHP_PMM
// POST /api/ohp_pmm
app.use("/api/ohp_pmm", ohpPmmRoute);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend server is running",
        version: backendVersion,
        port: Number(process.env.PORT || 8080),
        timestamp: new Date().toISOString(),
    });
});


// ============================================================
// BACKEND VERSION
// ============================================================

app.get("/api/version", (_req, res) => {
    res.set("Cache-Control", "no-store");

    return res.status(200).json({
        name: packageName,
        version: backendVersion,
        environment: process.env.NODE_ENV || "development"
    });
});


// ============================================================
// REQUEST LOGGER
// ============================================================

app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        console.log(
            `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
        );
    });

    next();
});


// ============================================================
// 404 HANDLER
// ============================================================

app.use((req, res) => {
    console.warn(`⚠️ Route not found: ${req.method} ${req.originalUrl}`);

    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
    console.error("❌ Server Error:");
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
});


// ============================================================
// PROCESS ERROR HANDLERS
// ============================================================

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:");
    console.error(err);
});

process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Promise Rejection:");
    console.error(reason);
});


// ============================================================
// START SERVER
// ============================================================

async function startServer() {
    try {
        const serverMode = (
            process.env.SERVER_MODE ||
            (process.env.NODE_ENV === "production" ? "production" : "local")
        ).toLowerCase();

        const isProduction = serverMode === "production";

        const host = isProduction
            ? process.env.SERVER_HOST_PRODUCTION || "0.0.0.0"
            : process.env.SERVER_HOST_LOCAL || "127.0.0.1";

        const configuredPort = isProduction
            ? process.env.SERVER_PORT_PRODUCTION
            : process.env.SERVER_PORT_LOCAL;

        const port = Number(
            process.env.PORT ||
            configuredPort ||
            8080
        );

        const apiBaseUrl = isProduction
            ? process.env.API_BASE_URL_PRODUCTION
            : process.env.API_BASE_URL_LOCAL ||
              `http://localhost:${port}/api`;

        console.log("======================================");
        console.log("🚀 Starting Backend Server...");
        console.log("📅 Started At :", new Date().toLocaleString());
        console.log("🌍 Server Mode:", serverMode);
        console.log("🟢 Node Version:", process.version);
        console.log("🔄 Connecting to database...");
        console.log("======================================");

        await dbConnect();

        console.log("✅ Database Connected Successfully");

        app.listen(port, host, () => {
            console.log("======================================");
            console.log("✅ Server is Running");
            console.log(`🌐 Host     : http://${host}:${port}`);
            console.log(`📁 API Base : ${apiBaseUrl}`);
            console.log(`🕒 Started  : ${new Date().toLocaleString()}`);
            console.log("======================================");
        });

    } catch (err) {
        console.error("❌ Failed to start server");
        console.error(err);
        process.exit(1);
    }
}

startServer()