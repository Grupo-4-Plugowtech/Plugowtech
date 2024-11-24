import prisma from "../../utils/prisma.js";

export const userModels = {
    getAll: async () => {
        try {
            const usersAll = await prisma.user.findMany({
                include: {
                    company: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            return usersAll;
        } catch (error) {
            console.error('Error while fetching all users:', error);
            throw new Error('Could not fetch users');
        }
    },

    getById: async (id) => {
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

            return deletedUser;
        } catch (error) {
            console.error(`Error while deleting user with ID ${id}:`, error);
            throw new Error('Could not delete user');
        }
    }
};
