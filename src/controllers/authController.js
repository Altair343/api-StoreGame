import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";

/**
 * Manejar una solicitud de registro entrante.
 *
 * @param  \req.body [username, email, contraseña, roles ]
 * @return \json [token]
 *
 */

export const signup = async (req, res) => {

    try {
        // Capturando los datos recividos
        const { username, email, password, roles } = req.body;
        let rolUser = [];

        //Creando un objeto de usuario
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        })

        // Validando y agregando los roles
        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });

            if (foundRoles.length > 0) {
                newUser.roles = foundRoles.map((role) => role._id);
                rolUser = foundRoles.map((role) => role.name);
            } else {
                const role = await Role.findOne({ name: "user" });
                newUser.roles = [role._id];
                rolUser = ["user"];
            }

        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
            rolUser = ["user"];
        }

        // registrando el usuario en  Mongodb
        const saveUser = await newUser.save();

        // Creando el token
        const token = jwt.sign({ id: saveUser._id, roles: rolUser }, config.JSON_SECRET, {
            expiresIn: 7200, // 2 hours in segundos
        });

        return res.status(200).json({
            response: true,
            token: token,
            role: rolUser
        });

    } catch (error) {
        return res.status(500).json({
            code: "auth/global-error",
            response: false,
            message: "An error occurred",
            error: error
        });
    }

};

/**
 * Manejar una solicitud de inicio de sesión entrante.
 *
 * @param  \req.body [email, contraseña]
 * @return \json [token]
 *
 */

export const signin = async (req, res) => {
    try {
        // Se busca si el usuario existe
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );
        let rolUser = [];
        rolUser = userFound.roles.map((userRol) => userRol.name);

        if (!userFound) return res.status(400).json({
            code: "auth/wrong-email",
            response: false,
            message: "User Not Found"
        });

        // Se comparan las contraseñas, para saver si coinsiden
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(400).json({
                code: "auth/wrong-password",
                response: false,
                message: "Invalid Password"
            });

        const token = jwt.sign({ id: userFound._id, roles: rolUser }, config.JSON_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).json({
            response: true,
            token: token,
            role: rolUser
        });
    } catch (error) {
        return res.status(500).json({
            code: "auth/global-error",
            response: false,
            message: "An error occurred",
            error: error
        });
    }
};