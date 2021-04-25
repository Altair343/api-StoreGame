import config from "../config";
import jwt from "jsonwebtoken";
import { unlink } from 'fs-extra';
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
    /* let token = req.headers["x-access-token"]; */
    const authorization = req.get('Authorization');

    // en caso de que no exista la cabesera
    if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
        return res.status(403).json({
            code: "token/not-provided",
            response: false,
            message: "No token provided"
        });
    }

    let token = authorization.substring(7);

    try {
        const decoded = jwt.verify(token, config.JSON_SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({
                code: "token/not-valid-user",
                response: false,
                message: "No user found"
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            code: "token/global-error",
            response: false,
            message: error
        });
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
        return res.status(403).json({
            code: "role/not-valid",
            response: false,
            message: "Require Admin Role!"
        });

    } catch (error) {
        return res.status(500).send({
            code: "role/global-error",
            response: false,
            message: error
        });
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

        return res.status(403).json({
            code: "role/not-valid",
            response: false,
            message: "Require User Role!"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            code: "role/global-error",
            response: false,
            message: error
        });
    }
};