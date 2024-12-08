import { accessLogModel } from "./accessLogModels.js";

export const accessLogService = {
    getAllAccess: async () => {
        try {
            const allAccess = await accessLogModel.getAll();
            return allAccess;
        } catch (error) {
            throw error
        }
    }
}