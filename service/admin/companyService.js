import GenericModels from "../../models/genericModels.js";


class CompanyService {
    constructor(){
        this.model = new GenericModels('company');
    }
    
    get tableName() {
        return this.model.tableName; // Exponemos el `tableName`
    }

    async getByText(options){
        try {
            const items = await this.model.getByText(options);

            return items;
            
        } catch (error) {
            throw error;
        }
    }

    // Método para obtener todos los usuarios
    async getAll({ skip, take, orderBy, order }) {

        console.log(`from CompanyService: skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}`)
        try {
            return await this.model.getAll({
                skip,
                take,
                orderBy,
                order
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

export default new CompanyService();
