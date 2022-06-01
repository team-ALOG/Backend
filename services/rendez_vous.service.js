const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getALLRendezVous = async(id) =>{
    let idd = Number(id) ; 
    
    /* try{ */
        const allRendezVous = await prisma.$queryRaw`select date, name, email FROM (select * from "Rendez_vous" WHERE id_patient=${idd}) as "A" INNER JOIN "Medecin" ON "A"."id_medecin" = "Medecin"."id_medecin"`
        /* prisma.Rendez_vous.findMany({
            where : {
                id_patient : Number(id) 
           
            }
        }); */

        if (allRendezVous) {
            return {
                code : 200,
                data: { success: true, 
                    data : {
                        allRendezVous,
                    },
                }
            };

        }
        else {
            return {
                code : 200,
                data: { success: false, 
                    
                }
            };
        }
        
    /* }catch(e){
        console.error(e);
        return {
            code : 500,
            data: { success: false, errors: [{ msg: `Server error` }] }
        };
    } */
}

module.exports = {
    getALLRendezVous,
   
}