import prisma from "../../utils/prisma.js";
import { genericModels } from "../generic/genericModels.js";



export const scorePermissionModels = {
    getAll: async (options) => {
        return await genericModels.getAll({
            tableName: 'scorePermission',
            ...options,
            include:{
                company: {
                    select: {
                        name: true,
                    }
                },
            user: {
                select: {
                    name: true,
                },
            },
            },
        })
    },
    
    getById: async (id) => {
        try {
            const scorePermission = await prisma.scorePermission.findUnique({
                where: { id },
            });
            return scorePermission;
        } catch (error) {
            console.error('Error while fetching score permission by id:', error);
            throw new Error('Could not fetch score permission');
        }
    },
}