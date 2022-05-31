const router = require("express").Router();

const RendezVousController = require("../controllers/medecin.controller");

//get all rendez-vous
router.get("/:medecin_id", RendezVousController.getALLRendezVousMedecin);

router.get("/lock/:medecin_id", RendezVousController.lock);

router.get("/unlock/:medecin_id", RendezVousController.unlock);

router.get("getstate/:medecin_id", RendezVousController.getstate);

module.exports = router;

