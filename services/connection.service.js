const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

const login = async (email, password) => {
  try {
    const user = await prisma.Patient.findFirst({
      where: { email },
    });

    if (!user)
      return {
        code: 400,
        data: {
          success: false, errors: [{ msg: `User doesn't exist` }]
        }
      }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return {
        code: 400,
        data: {
          success: false, errors: [{ msg: "Email or password incorrect" }]
        }
      }

    // The user exists and the password is correct
    // create jwt
  /*   const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 36000,
    });
 */
    /**
     * FIXME: DONE
     * Discuss The tamplate of the response => Unique response in the whole application
     * Complete the other attributes in case we need to
     */
    return {
      code: 200,
      data: {
        success: true,
        data: {
          id: user.id_patient,
          email: user.email,
          numero_telephone: user.numero_telephone,
          nom: user.nom,
          prenom: user.prenom,
        },
      }
    }
  } catch (err) {
    console.error(err);
    return {
      code: 500,
      data: {
        success: false, errors: [{ msg: "Server error..." }]
      }
    }
  }
}



const loginMedecin = async (email, password) => {
  try {
    const user = await prisma.Medecin.findFirst({
      where: { email },
    });

    if (!user)
      return {
        code: 400,
        data: {
          success: false, errors: [{ msg: `User doesn't exist` }]
        }
      }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return {
        code: 400,
        data: {
          success: false, errors: [{ msg: "Email or password incorrect" }]
        }
      }

    // The user exists and the password is correct
    // create jwt
  /*   const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 36000,
    });
 */
    /**
     * FIXME: DONE
     * Discuss The tamplate of the response => Unique response in the whole application
     * Complete the other attributes in case we need to
     */
    return {
      code: 200,
      data: {
        success: true,
        data: {
          id: user.id_medecin,
          email: user.email,
          name: user.name,
        },
      }
    }
  } catch (err) {
    console.error(err);
    return {
      code: 500,
      data: {
        success: false, errors: [{ msg: "Server error..." }]
      }
    }
  }
}

const hash = async(req, res) => {
 
const password = "hibahiba"
const salt = await bcrypt.genSalt(parseInt(process.env.SALT) || 10);
const passwordHash = await bcrypt.hash(password, salt);
 console.log(passwordHash) 
/* return passwordHash 
 */
}
module.exports = { login  , loginMedecin , hash}