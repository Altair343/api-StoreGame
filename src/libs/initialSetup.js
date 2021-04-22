import Role from "../models/Role";

export const createRoles = async () => {
    try {
        // Cuenta los documentos
        const count = await Role.estimatedDocumentCount();

        // retorna si existen roles
        if (count > 0) return;

        // Crea roles por defecto
        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "admin" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};
