const router = require("express").Router();

const RendezVousController = require("../controllers/medecin.controller");

//get all rendez-vous
router.get("/:medecin_id", RendezVousController.getALLRendezVousMedecin(req, res));

router.get("/lock/:medecin_id", RendezVousController.lock(req, res));

router.get("/unlock/:medecin_id", RendezVousController.unlock(req, res));

router.get("getstate/:medecin_id", RendezVousController.getstate(req, res));

module.exports = router;

