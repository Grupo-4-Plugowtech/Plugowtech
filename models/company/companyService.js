import { companyModels } from "./companyModels.js";

export const companyService = {

    getAllCompanies: async () => {
        try {
            const allCompanies = await companyModels.getAll();
            return allCompanies;
            
        } catch (error) {
            throw Error
        }

    }

}