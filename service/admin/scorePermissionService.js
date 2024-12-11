import GenericModels from "../../models/genericModels.js";
import scoreService from "./scoreService.js";



class ScorePermissionService {
    constructor(){
        this.model = new GenericModels('scorePermission');
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
                order,
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
    // async create(userData) {
    //     try {
    //         return await this.model.create(userData);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // Atualização de status em Score Permission e creação de pontação em Score!
    async update(id, userData) {

        try {
            const data = await this.model.update(id, userData);
            const { status } = data;

            switch (status) {
                case 'approved':
                    try {
                        const score = await scoreService.getById({ scorePermissionId: data.id });
                        if(!score){
                            await scoreService.create({
                                userId: data.userId,
                                companyId: data.companyId,
                                scorePermissionId: data.id,
                                description: data.description,
                                points: data.points,
                            });
                        }

                        return data

                    } catch (error) {
                        throw error;
                    };
                case 'rejected':
                    try {
                        const score = await scoreService.getById({ scorePermissionId: data.id });
                        if(score){
                            await scoreService.delete({ scorePermissionId: data.id })
                        }
                        return data
                    } catch (error) {
                        throw error;
                    }
                default:
                    return data
            }
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

export default new ScorePermissionService();
