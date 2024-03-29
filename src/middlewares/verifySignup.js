import User from "../models/User";
import { ROLES } from "../models/Role";

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| checkDuplicateUsernameOrEmail para verificar el correo y usuario proporcionados [Si existen] 
| checkRolesExisted para verificar si los roles proporcionados [ Existen ]
| 
*/

/**
 * Manejar una solicitud de verificación de existencia de email o username.
 *
 * @param  \req.body [ email, username ]
 * @return \next()
 *
 */

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({
        code: "auth/duplicate-username",
        response: false,
        message: "The user already exists"
      });
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({
        code: "auth/duplicate-email",
        response: false,
        message: "The email already exists"
      });
    next();
  } catch (error) {
    res.status(500).json({
      code: "auth/verify-error",
      response: false,
      message: error
    });
  }
};

/**
 * Manejar una solicitud de verificación de existencia de rol,
 *
 * @param  \req.body [ roles ]
 * @return \next()
 *
 */

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          code: "role/not-exist",
          response: false,
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };