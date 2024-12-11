import GenericModels from "../../models/genericModels.js";

class AccessLogService {
    constructor(){
        this.model = new GenericModels('accessLog');
    }
    
    get tableName() {
        return this.model.tableName; // Exponemos el `tableName`
    }

    async getAll({ skip, take, orderBy, order }) {

        console.log(`from AcessLogService: skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}`)
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
}

export default new AccessLogService();