const authController = require("../controllers/connection.controller")
// Create express router
const router = require("express").Router();

router.post("/api/connection", authController.login)
router.post("/api/connectionMed", authController.loginMedecin)


// export default router;
module.exports = router;
