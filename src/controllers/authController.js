require('dotenv').config();

import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {

    try {
        // Capturando los datos recividos
        const { username, email, password, roles } = req.body;

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
            } else {
                const role = await Role.findOne({ name: "user" });
                newUser.roles = [role._id];
            }

        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        // registrando el usuario en  Mongodb
        const saveUser = await newUser.save();

        // Creando un token
        const token = jwt.sign({ saveUser }, process.env.JSON_SECRET, {
            expiresIn: 86400, // 24 hours segundos
        });

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json(error);
    }

};

export const signin = async (req, res) => {
    try {
        // Se busca si el usuario existe
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        // Se comparan las contraseñas, para saver si coinsiden
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = jwt.sign({ id: userFound }, process.env.JSON_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.json({ token });
    } catch (error) {
        console.log(error);
    }
};