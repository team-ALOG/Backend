const authController = require("../controllers/connection.controller")
// Create express router
const router = require("express").Router();

// Authenticate clients
router.post("/api/connection", authController.login)

// export default router;
module.exports = router;
