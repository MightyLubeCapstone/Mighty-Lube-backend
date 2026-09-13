const express = require("express");

const { authenticate } = require("./sessions");
const ProductConfiguration = require("../models/product_configuration");

const router = express.Router();


// =========================================================
// GET /api/cart
//
// PURPOSE:
// Fetch ONLY the logged-in user's cart items.
//
// Cart is no longer stored inside User.cart.
// Cart items are ProductConfiguration records where:
//
// userID = logged-in user
// status = "cart"
//
// Frontend can use this response to show cart cards.
// =========================================================

router.get("/", authenticate, async (req, res) => {
  try {
    const cartItems = await ProductConfiguration.find({
      userID: req.user.userID,
      status: "cart",
    }).sort({
      createdAt: -1,
    });


    // Empty cart is NOT an error.
    // Frontend can simply show "Cart is empty".
    if (!cartItems.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        cart: [],
      });
    }


    const cart = cartItems.map((item) => ({
      configurationID: item.configurationID,

      configurationName: item.configurationName,

      productType: item.productType,

      productName: item.productName,

      quantity: item.numRequested,

      status: item.status,

      isComplete: item.isComplete,

      createdAt: item.createdAt,

      updatedAt: item.updatedAt,
    }));


    return res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });

  } catch (error) {
    console.error("GET /api/cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});


// =========================================================
// GET /api/cart/order
//
// PURPOSE:
// Fetch ONE complete configured product from cart.
//
// Frontend should send:
//
// configurationid: <configurationID>
//
// in request headers.
//
// Old orderid header is also temporarily supported.
// =========================================================

router.get("/order", authenticate, async (req, res) => {
  try {
    const configurationID =
      req.headers.configurationid ||
      req.headers.orderid;


    if (!configurationID) {
      return res.status(400).json({
        success: false,
        message: "configurationID is required",
      });
    }


    const configuration =
      await ProductConfiguration.findOne({
        configurationID,
        userID: req.user.userID,
        status: "cart",
      });


    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Cart configuration not found",
      });
    }


    return res.status(200).json({
      success: true,

      configuration: {
        configurationID:
          configuration.configurationID,

        configurationName:
          configuration.configurationName,

        productType:
          configuration.productType,

        productName:
          configuration.productName,

        numRequested:
          configuration.numRequested,

        status:
          configuration.status,

        isComplete:
          configuration.isComplete,

        configurationData:
          configuration.configurationData,

        createdBy:
          configuration.createdBy,

        updatedBy:
          configuration.updatedBy,

        createdAt:
          configuration.createdAt,

        updatedAt:
          configuration.updatedAt,
      },
    });

  } catch (error) {
    console.error(
      "GET /api/cart/order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch cart configuration",
      error: error.message,
    });
  }
});


// =========================================================
// PUT /api/cart/order
//
// PURPOSE:
// Edit ONE configuration currently inside cart.
//
// Body:
//
// {
//   "configurationID": "...",
//   "data": {
//      "...": "..."
//   },
//   "numRequested": 2
// }
//
// Old "orderID" is temporarily supported too.
// =========================================================

router.put("/order", authenticate, async (req, res) => {
  try {
    const {
      configurationID,
      orderID,
      data,
      numRequested,
    } = req.body;


    const targetConfigurationID =
      configurationID || orderID;


    if (!targetConfigurationID) {
      return res.status(400).json({
        success: false,
        message: "configurationID is required",
      });
    }


    const configuration =
      await ProductConfiguration.findOne({
        configurationID:
          targetConfigurationID,

        userID:
          req.user.userID,

        status:
          "cart",
      });


    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Cart configuration not found",
      });
    }


    // =====================================================
    // UPDATE CONFIGURATION DATA
    // =====================================================

    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data)
    ) {
      configuration.configurationData = {
        ...configuration.configurationData,
        ...data,
      };

      configuration.markModified(
        "configurationData"
      );
    }


    // =====================================================
    // UPDATE QUANTITY
    // =====================================================

    if (
      numRequested !== undefined &&
      numRequested !== null
    ) {
      const quantity = Number(numRequested);

      if (
        Number.isNaN(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "numRequested must be at least 1",
        });
      }

      configuration.numRequested = quantity;
    }


    // =====================================================
    // UPDATE AUDIT INFO
    // =====================================================

    configuration.updatedBy = {
      userID:
        req.user.userID,

      username:
        req.user.username,

      firstName:
        req.user.firstName || "",

      lastName:
        req.user.lastName || "",

      role:
        req.user.role || "user",
    };


    await configuration.save();


    return res.status(200).json({
      success: true,

      message:
        "Cart configuration updated successfully",

      configurationID:
        configuration.configurationID,
    });

  } catch (error) {
    console.error(
      "PUT /api/cart/order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update cart configuration",
      error: error.message,
    });
  }
});


// =========================================================
// DELETE /api/cart/order
//
// PURPOSE:
// Delete ONE configured product from cart.
//
// Body:
//
// {
//   "configurationID": "..."
// }
//
// Old orderID is temporarily supported too.
// =========================================================

router.delete("/order", authenticate, async (req, res) => {
  try {
    const {
      configurationID,
      orderID,
    } = req.body;


    const targetConfigurationID =
      configurationID || orderID;


    if (!targetConfigurationID) {
      return res.status(400).json({
        success: false,
        message: "configurationID is required",
      });
    }


    const deletedConfiguration =
      await ProductConfiguration.findOneAndDelete({
        configurationID:
          targetConfigurationID,

        userID:
          req.user.userID,

        status:
          "cart",
      });


    if (!deletedConfiguration) {
      return res.status(404).json({
        success: false,
        message: "Cart configuration not found",
      });
    }


    return res.status(200).json({
      success: true,

      message:
        "Cart configuration deleted successfully",

      configurationID:
        targetConfigurationID,
    });

  } catch (error) {
    console.error(
      "DELETE /api/cart/order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete cart configuration",
      error: error.message,
    });
  }
});


module.exports = router;