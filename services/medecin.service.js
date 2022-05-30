const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getALLRendezVousMedecin = async(id) =>{
    
    try{
        const allRendezVous = await prisma.Rendez_vous.findMany({
            where : {
                id_medecin : Number(id) ,
                date : Date.now(),
            }
        });

        if (allRendezVous)
        return {
            code : 200,
            data: { success: true, 
                data : {
                    allRendezVous,
                },
            }
        };
    }catch(e){
        console.error(e);
        return {
            code : 500,
            data: { success: false, errors: [{ msg: `Server error` }] }
        };
    }
}

module.exports = {
    getALLRendezVousMedecin,
   
}