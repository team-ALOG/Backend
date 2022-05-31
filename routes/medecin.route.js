const router = require("express").Router();

const RendezVousController = require("../controllers/medecin.controller");

//get all rendez-vous
router.get("/medecin/:medecin_id", RendezVousController.getALLRendezVousMedecin);

router.get("/lock/:patient_id", RendezVousController.lock);

router.get("/unlock/:patient_id", RendezVousController.unlock);

router.get("getstate/:id_rendez_vous", RendezVousController.getstate);

module.exports = router;

