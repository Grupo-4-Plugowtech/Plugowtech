import { userModels } from "./userModels.js";

export const userService = {
    getAllUsers: async (pagination) => {
        console.log(JSON.stringify(pagination, null, 2));
        try {
            // Llamada al modelo con el parámetro recibido
            const users = await userModels.getAll(pagination);

            return users;  // Devolvemos los usuarios
        } catch (error) {
            throw error;  // En caso de error, lo lanzamos nuevamente
        }
    },

    getUserById: async (id) => {
        try {
            const user = await userModels.getById(id);
            return user;
        } catch (error) {
            throw error;
        }
    },

    getUserByEmail: async (email) => {
        try {
            const user = await userModels.getByEmail(email);

            return user;

        } catch (error) {
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            // Validar datos antes de crear el usuario
            // validateUserData(userData);
            return await userModels.create(userData);
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            // Validar datos antes de actualizar el usuario
            // validateUserData(userData);
            const updatedUser = await userModels.update(id, userData);

            return updatedUser;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const deletedUser = await userModels.delete(id);
            
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }
};
