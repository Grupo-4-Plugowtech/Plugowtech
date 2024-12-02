import prisma from "../../utils/prisma.js";

export const userModels = {
    getAll: async ({skip, take, orderBy, order }) => {

        try {
            const totalUsers = await prisma.user.count();

            const usersAll = await prisma.user.findMany({
                skip,
                take,
                orderBy: {
                    [orderBy]: order,
                },
                include: {
                    company: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            return {
                data: usersAll,
                metadata: {
                    skip,
                    take,
                    totalUsers,
                    totalPages: Math.ceil(totalUsers / take),
                }
            }
        } catch (error) {
            console.error('Error while fetching all users:', error);
            throw new Error('Could not fetch users');
        }
    },

    getById: async (id) => {
        console.log(`id: ${id}`);
        try {
            const userId = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });

            if (!userId) {
                throw new Error(`User with ID ${id} not found`);
            }

            return userId;
        } catch (error) {
            console.error(`Error while fetching user with ID ${id}:`, error);
            throw new Error('Could not fetch user with that ID');
        }
    },

    getByEmail: async(email) => {
        try {

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            return user
            
        } catch (error) {
            console.error('Error getting user by email:', error)
            throw new Error(`Could not fetch user by email`)
        }
    },

    create: async (userData) => {
        try {
            const newUser = await prisma.user.create({
                data: userData 
            });
            return newUser;
        } catch (error) {
            console.error('Error while creating user:', error);
            throw new Error('Could not create user');
        }
    },

    update: async (id, userData) => {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: userData  
            });

            return updatedUser;
        } catch (error) {
            console.error(`Error while updating user with ID ${id}:`, error);
            throw new Error('Could not update user');
        }
    },

    delete: async (id) => {
        try {
            const deletedUser = await prisma.user.delete({
                where: {
                    id: id
                }
            });
            console.log(deletedUser)

            return deletedUser;
        } catch (error) {
            console.error(`Error while deleting user with ID ${id}:`, error);
            throw new Error('Could not delete user');
        }
    }
};
