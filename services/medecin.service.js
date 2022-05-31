const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getstate = async(id_rendez_vous) => {
    
    const id_patient = await prisma.Rendez_vous.find(
        {
            where : { 
                id_patient : Number(id_rendez_vous)
            }
        }
    )
    try {
        const numero_dossier = await prisma.Patient.find(
            {
                where : { 
                    numero_dossier : Number(patient_id)
                }
            }
    
        )
        if(numero_dossier) {
            const lock = await prisma.DossierMedical.find(
                {
                    select : {
                        locked
                    } ,
                    
                    where : { 
                        id_dossier : Number(numero_dossier)
        
                    } , 
                    
                } 
                
        
            )
            if(lock.locked == true) {
                return {
                    code : 200,
                    data: { 
                        locked: true
                    }
                };
            }
            else {
                return {
                    code : 200,
                    data: { 
                        locked: false
                    }
                };

            }
        }
    } catch(e) {
        return {
            code : 400,
            data: { 
                locked: true
            }
        };

    }       

}



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

const lock = async(numero_doss) => {
    try {
    const numero_dossier = await prisma.Patient.find(
        {
            where : { 
                numero_dossier : Number(numero_doss)

            }
        }

    )
    if(numero_dossier) {
        const lock = await prisma.DossierMedical.update(
            {
                select : {

                } ,
                where : { 
                    id_dossier : Number(numero_doss)
    
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


const unlock = async(patient_id) => {
    try {
    const numero_dossier = await prisma.Patient.find(
        {
            where : { 
                numero_dossier : Number(patient_id)
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
        const documentMedical = await prisma.Dossier_Document_association.findMany({ 
            select: {
                id_document
            } ,
            where : {
             id_dossier : Number(numero_dossier)
               
            }
        })
        //todo : iterate throu findmany and 
        const paths = [];
        documentMedical.array.forEach(document => {
            paths.push(
                await prisma.DocumentMedical.find({ 
                    select: {
                        document_path
                    } ,
                    where : {
                        id_document : Number(document.id_document) 
                       
                    }
                })
                
                
                )
            
        });
         /* foreach (dossier in documentMedical.id_document ) { 
            
        }  */

        /* const documentMedical = await prisma.Dossier_Document_association.findMany({ 
        

        } */
        return {
            code : 200,
            data: { 
                success: true ,
                data : paths
            }
        };

    }
    
}
catch(e){
    console.error(e);
    return {
        code : 500,
        data: { success: false, errors: [{ msg: `Server error` }] }
    };
}
}




module.exports = {
    getALLRendezVousMedecin,
    lock ,
    unlock , 
    getstate
    
   
}