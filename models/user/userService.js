import { userModels } from "./userModels.js";

export const userService = {
    getAllUsers: async () => {
        try {
            return await userModels.getAll();
        } catch (error) {
            throw new DatabaseError('Could not fetch users');
        }
    },

    getUserById: async (id) => {
        try {
            const user = await userModels.getById(id);
            if (!user) {
                throw new UserNotFoundError(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Could not fetch user');
        }
    },

    createUser: async (userData) => {
        try {
            // Validar datos antes de crear el usuario
            validateUserData(userData);
            return await userModels.create(userData);
        } catch (error) {
            throw new DatabaseError('Could not create user');
        }
    },

    updateUser: async (id, userData) => {
        try {
            // Validar datos antes de actualizar el usuario
            validateUserData(userData);
            const updatedUser = await userModels.update(id, userData);
            if (!updatedUser) {
                throw new UserNotFoundError(`User with ID ${id} not found`);
            }
            return updatedUser;
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Could not update user');
        }
    },

    deleteUser: async (id) => {
        try {
            const deletedUser = await userModels.delete(id);
            if (!deletedUser) {
                throw new UserNotFoundError(`User with ID ${id} not found`);
            }
            return deletedUser;
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Could not delete user');
        }
    }
};
