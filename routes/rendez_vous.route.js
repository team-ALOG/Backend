const router = require("express").Router();

const RendezVousController = require("../controllers/rendez_vous.controller");

//get all rendez-vous
router.get("/api/:patient_id", RendezVousController.getALLRendezVous);

module.exports = router;
