// import { userModels } from "../../models/user/userModels.js";
import GenericModels from "../../models/genericModels.js";

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


class UserService {
    constructor() {
        this.model = new GenericModels('user');  // Aquí pasamos 'user' como nombre de la tabla
    }

    get tableName() {
        return this.model.tableName; // Exponemos el `tableName`
    }

    async getByText(searchText){
        try {
            const items = await this.model.getByText(searchText);

            return items;
            
        } catch (error) {
            throw error;
        }
    }

    // Método para obtener todos los usuarios
    async getAll({ skip, take, orderBy, order }) {

        console.log(`from UserService: skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}`)
        try {
            return await this.model.getAll({
                skip,
                take,
                orderBy,
                order,
                include: {
                    company: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    // Método para obtener un usuario por su ID
    async getById(id) {
        try {
            return await this.model.getById(id);
        } catch (error) {
            throw error;
        }
    }

    // Método para crear un nuevo usuario
    async create(userData) {
        try {
            return await this.model.create(userData);
        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar un usuario
    async update(id, userData) {
        try {
            return await this.model.update(id, userData);
        } catch (error) {
            throw error;
        }
    }

    // Método para eliminar un usuario
    async delete(id) {
        try {
            return await this.model.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
