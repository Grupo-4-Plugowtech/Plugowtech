import { scorePermissionModels } from "./scorePermissionModels.js";

export const scorePermissionService = {
    getAllSP: async(options) => {
        try {
            const scorePermissions = await scorePermissionModels.getAll(options);
            return scorePermissions;
        } catch (error) {
            throw error
        }
    }
};