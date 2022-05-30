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
            data: { 
                success: true
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

const lock = async(numero_dossier) => {
    try {
    const numero_dossier = await prisma.Patient.find(
        {
            where : { 
                numero_dossier : Number(numero_dossier)

            }
        }

    )
    if(numero_dossier) {
        const lock = await prisma.DossierMedical.update(
            {
                where : { 
                    id_dossier : Number(numero_dossier)
    
                } , 
                data : { 
                    locked : true

                }
            } 
            
    
        )
        return {
            code : 200,
            data: { success: true, 
                
            }
        };

    } 
}catch(e){
    console.error(e);
    return {
        code : 500,
        data: { success: false, errors: [{ msg: `Server error` }] }
    };
}

}


const unlock = async(numero_dossier) => {
    try {
    const numero_dossier = await prisma.Patient.find(
        {
            where : { 
                numero_dossier : Number(numero_dossier)
            }
        }

    )
    if(numero_dossier) {
        const lock = await prisma.DossierMedical.update(
            {
                where : { 
                    id_dossier : Number(numero_dossier)
    
                } , 
                data : { 
                    locked : false

                }
            } 
            
    
        )
        return {
            code : 200,
            data: { 
                success: true
            }
        };

    }
    
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