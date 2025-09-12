const express = require('express');
const router = express.Router();


router.get("/healthUptime", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Health check working fine",
        timestamp: new Date().toISOString()
    });
});


module.exports = router;