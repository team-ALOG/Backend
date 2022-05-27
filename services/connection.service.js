const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

const login = async (email, password) => {
  try {
    const user = await prisma.patients.findFirst({
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
          id: user.agent_id,
          email: user.email,
          phone_number: user.phone_number,
          name: user.name,
          family_name: user.family_name,
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

module.exports = { login }