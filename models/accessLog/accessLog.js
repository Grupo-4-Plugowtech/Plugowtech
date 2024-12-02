import prisma from "../../utils/prisma.js";

export const accessLogModel = {
    getAll: async () => {
        try {
            const access = await prisma.accessLog.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            lastname: true,
                            cpf: true,
                            phone: true,
                            email: true,
                            city: true,
                            birth_date: true,
                            approved_terms: true,
                            role: true,

                            company: {
                                select: {
                                    name: true,
                                }
                            },
                            profession: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            })

            return access
            
        } catch (error) {
            console.error('Error while fetching all access logs:', error);
            throw new Error('Could not fetch access logs');
        }

    }
}