const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getstate = async(id_patient) => {
    
    
    /* try { */
        const numero_dossier = await prisma.Patient.findUnique(
            {
                where : { 
                    id_patient : Number(id_patient)
                }
            }
    
        )
        if(numero_dossier) {
            const lock = await prisma.DossierMedical.findUnique(
                {
                    where : { 
                        id_dossier : Number(numero_dossier.numero_dossier)
        
                    } 
                    
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
    /* } catch(e) {
        return {
            code : 400,
            data: { 
                locked: true
            }
        };

    }      */  

}



const getALLRendezVousMedecin = async(id) =>{
    let idd = Number(id) ;
    
    /* try{ */
        const allRendezVous = await prisma.$queryRaw`select date, nom, prenom, email, numero_telephone, numero_dossier FROM (select * from "Rendez_vous" WHERE id_medecin=${idd}) as "A" INNER JOIN "Patient" ON "A"."id_patient" = "Patient"."id_patient"`
        /* const allRendezVous =await  prisma.Rendez_vous.findMany({
            where : {
                id_medecin : Number(id) ,
            }
        });  */
       /* const today = new Date();
        const month = Number(today.getMonth()) +1 ; 
        const day = Number(today.getDate())  ;
        const year =  Number(today.getFullYear()) ;  */ 
       /*  console.log(month) ;
        console.log(day) ; 
        console.log(year); */
    //   const allRendezVous = await prisma.$queryRaw`SELECT * FROM (SELECT *, EXTRACT(DAY FROM date) AS DAY,  EXTRACT(MONTH FROM date) AS MONTH, EXTRACT(YEAR FROM date) AS YEAR FROM "Rendez_vous" ) AS A WHERE "month"=${month} AND "year"=${year} AND "day" = ${day} `
      //const allRendezVous = await prisma.$queryRaw`SELECT * FROM (SELECT *, EXTRACT(DAY FROM date) AS DAY,  EXTRACT(MONTH FROM date) AS MONTH, EXTRACT(YEAR FROM date) AS YEAR FROM "Rendez_vous" ) AS A WHERE year=${year} AND day = '31' `
 
     //  const test = await prisma.$queryRaw`SELECT *, EXTRACT(DAY FROM date) AS DAY,  EXTRACT(MONTH FROM date) AS MONTH, EXTRACT(YEAR FROM date) AS YEAR FROM "Rendez_vous"`

      //   const allRendezVous = await prisma.$queryRaw`SELECT EXTRACT(DAY FROM date) AS DAY,  EXTRACT(MONTH FROM date) AS MONTH, EXTRACT(YEAR FROM date) AS YEAR FROM "Rendez_vous" WHERE MONTH=${month} AND YEAR=${year} AND DAY = ${day}`


        if (allRendezVous)
        {
            

            return {
                code : 200,
                data: { 
                    success: true , 
                    data : allRendezVous
                }
            };

        }
        else {
            return {
                code : 400,
                
            };
        }
       
   /*  }catch(e){
        console.error(e);
        return {
            code : 500,
            data: { success: false, errors: [{ msg: `Server error` }] }
        };
    } */
}

const lock = async(patient_id) => {
     /* try {  */
    const numero_dossier = await prisma.Patient.findFirst(
        {
            where : { 
                id_patient : Number(patient_id)

            }
        }

     ) 

    if(numero_dossier) {
        const lock = await prisma.DossierMedical.update(
            {
                where : { 
                    id_dossier : Number(numero_dossier.numero_dossier)
    
                } , 
                data : { 
                    locked : true
                }
            } 
            
    
        )
        if(lock){
            return {
                code : 200,
                data: { 
                    success: true, 
                    data : lock
                    
                }
            };

        }
        else {
            return {
                code : 200,
                data: { 
                    success: false, 
                    
                }
            };
        }
       

    } else {
        return {
            code : 200,
            data: { 
                success: false, 
                
            }
        };

    }
 /* }catch(e){
    console.error(e);
    return {
        code : 500,
        data: { success: false, errors: [{ msg: `Server error` }] }
    };
} 
 */
}


const unlock = async(patient_id) => {
    /* try { */
    const numero_dossier = await prisma.Patient.findFirst(
        {
            where : { 
                id_patient : Number(patient_id)
            }
        }

    )
    if(numero_dossier) {
        const lock = await prisma.DossierMedical.update(
            {
                
                where : { 
                    id_dossier : Number(numero_dossier.numero_dossier)
    
                } , 
                data : { 
                    locked : false

                }
            } 
            
    
        ) // locked updated 
        const documentMedical = await prisma.Dossier_Document_association.findMany({ 
           
            where : {
             id_dossier : Number(numero_dossier.numero_dossier)
               
            }
        })
        //todo : iterate throu findmany and 
        const paths = [];
        for(let i=0 ; i<documentMedical.length ; i++) {
            let doc = await prisma.DocumentMedical.findFirst({ 
                where : {
                    id_document : Number(documentMedical[i].id_document) 
                   
                }
            }) ; 
            paths.push(doc) ;

        }
       
      
         
        return {
            code : 200,
            data: { 
                success: true ,
                data : paths
            }
        };

    }
    
/* }
catch(e){
    console.error(e);
    return {
        code : 500,
        data: { success: false, errors: [{ msg: `Server error` }] }
    };
} */
}




module.exports = {
    getALLRendezVousMedecin,
    lock ,
    unlock , 
    getstate
    
   
}