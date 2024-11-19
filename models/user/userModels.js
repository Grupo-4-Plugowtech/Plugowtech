import prisma from "../../utils/prisma.js";

export const user = {
    getAll: async () => {
        const usersAll = await prisma.user.findMany();
        return usersAll
    }
}

