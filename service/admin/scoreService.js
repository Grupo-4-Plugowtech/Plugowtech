// import { userModels } from "../../models/user/userModels.js";
import GenericModels from "../../models/genericModels.js";

class ScoreService {
    constructor() {
        this.model = new GenericModels('score');  // Aquí pasamos 'user' como nombre de la tabla
    }

    get tableName() {
        return this.model.tableName; // Exponemos el `tableName`
    }

    async getByText(tableName){
        try {
            const items = await this.model.getByText(tableName);

            return items;
            
        } catch (error) {
            throw error;
        }
    }

    // Método para obtener todos los usuarios
    async getAll({ skip, take, orderBy, order, companyId }) {

        console.log(`from UserService: skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}, companyId: ${companyId}`)
        try {
            return await this.model.getAll({
                skip,
                take,
                orderBy,
                order,
                companyId,
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
    async getById(whereParams) {
        try {
            return await this.model.getById(whereParams);
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
    async delete(whereParams) {
        try {
            return await this.model.delete(whereParams);
        } catch (error) {
            throw error;
        }
    }
}

export default new ScoreService();
