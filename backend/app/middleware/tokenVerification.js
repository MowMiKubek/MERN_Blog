import jwt from "jsonwebtoken";
import config from "../config.js";

function tokenVerification(req, res, next) {
  const jwtKey = config.JWTPRIVATEKEY
  //pobranie tokenu z nagłówka:
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).send({ message: "No token provided!" });
    return
  }
  //jeśli przesłano token - weryfikacja jego poprawności:
  jwt.verify(token, jwtKey, (err, decodeduser) => {
    if (err) {
      console.log("Unauthorized!");
      res.status(401).send({ message: "Unauthorized!" });
      return
    }
    console.log("Token poprawny, użytkownik: " + decodeduser._id);
    req.user = decodeduser;
    console.log(decodeduser)
    next();
  });
}

export default tokenVerification;