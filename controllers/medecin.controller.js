const Joi = require("joi");
const rendezVousService = require("../services/medecin.service");



const getALLRendezVousMedecin = async (req, res) => {

    const { code, data } = await rendezVousService.getALLRendezVousMedecin(req.params.medecin_id)
    return res.status(code).json(data) 
    
}

const lock = async (req, res) => {

    const { code, data } = await rendezVousService.lock(req.params.patient_id)
    return res.status(code).json(data) 
    
}

const unlock = async (req, res) => {

    const { code, data } = await rendezVousService.unlock(req.params.patient_id)
    return res.status(code).json(data) 
    
}

const getstate = async (req, res) => {

    const { code, data } = await rendezVousService.getstate(req.params.id_rendez_vous)
    return res.status(code).json(data) 
    
}


module.exports = {
    getALLRendezVousMedecin , 
    lock , 
    unlock , 
    getstate
}