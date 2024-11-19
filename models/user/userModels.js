import prisma from "../../utils/prisma.js";

export const user = {
    getAll: async () => {
        const usersAll = await prisma.User.findMany();
        return usersAll
    }
}

