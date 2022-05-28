const Joi = require("joi");
const rendezVousService = require("../services/rendez_vous.service");



const getALLRendezVous = async (req, res) => {

    const { code, data } = await rendezVousService.getALLRendezVous(req.params.patient_id)
    return res.status(code).json(data) 
    
}
module.exports = {
    getALLRendezVous
}