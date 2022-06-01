const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getALLRendezVous = async(id) =>{
    
    try{
        const allRendezVous = await prisma.Rendez_vous.findMany({
            where : {
                id_patient : Number(id) 
           
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
    getALLRendezVous,
   
}