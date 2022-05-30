const router = require("express").Router();

const RendezVousController = require("../controllers/medecin.controller");

//get all rendez-vous
router.get("/:medecin_id", RendezVousController.getALLRendezVousMedecin);



