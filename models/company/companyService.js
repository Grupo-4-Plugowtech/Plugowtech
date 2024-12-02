import { companyModels } from "./companyModels.js";

export const companyService = {

    getAllCompanies: async () => {
        try {
            const allCompanies = await companyModels.getAll();
            return allCompanies;
            
        } catch (error) {
            throw Error
        }

    },

    getCompanyById: async (id) => {
        try {
            const company = await companyModels.getById(id);
            return company;
        } catch (error) {
            throw Error
        }
    },

    createCompany: async (companyData) => {
        try {
            // Validar datos antes de crear el usuario
            // validateUserData(userData);
            return await companyModels.create(companyData);
        } catch (error) {
            throw error;
        }
    },

    updateCompany: async (id, companyData) => {
        try {
            // Validar datos antes de actualizar el usuario
            // validateUserData(userData);
            const updatedUser = await companyModels.update(id, companyData);

            return updatedUser;
        } catch (error) {
            throw error;
        }
    },

    deleteCompany: async (id) => {
        try {
            const deletedCompany = await companyModels.delete(id);
            
            return deletedCompany;
        } catch (error) {
            throw error;
        }
    }



}