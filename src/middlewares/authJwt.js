import config from "../config";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| verifyToken para verificar el token [Si existe, si es valido] 
| isAdmin para verificar si el usuario tiene el rol de administrador
| isUser para verificar si el usuario tiene el rol de usuario
|
*/


/**
 * Manejar una solicitud de verificación de token.
 *
 * @param  \req.headers [x-access-token ]
 * @return \next()
 *
 */

export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    // en caso de que no exista la cabesera
    if (!token) return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, config.JSON_SECRET);
        req.userId = decoded.id._id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

/**
 * Manejar una solicitud de verificación de existencia de rol administrador.
 *
 * @param  \\req [ userId ]
 * @return \next()
 *
 */

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

/**
 * Manejar una solicitud de verificación de existencia de rol usuario.
 *
 * @param  \\req [ userId ]
 * @return \next()
 *
 */

export const isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "user") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require User Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};