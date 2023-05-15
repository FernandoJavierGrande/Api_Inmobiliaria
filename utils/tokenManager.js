import jwt from "jsonwebtoken";

export const generateToken = (uid, role) => {
  const expiresIn = 60 * 60;

  try {
    const token = jwt.sign({ uid, role }, process.env.JWT, { expiresIn });
    return { token, expiresIn, role };
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No token": "Sin autorizacion. Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
  forbbiden: "sin autorizacion",
};
