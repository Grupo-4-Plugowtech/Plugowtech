import prisma from "../../utils/prisma.js";


export const companyModels = {

    getAll: async () => {
        try {
            const companiesAll = await prisma.company.findMany();
            return companiesAll;
        } catch (error) {
            console.error('Error while fetching all companies:', error);
            throw new Error('Could not fetch companies');
        }
    },

    getById: async (id) => {
        try {
            const companyId = await prisma.company.findUnique({
                where: {
                    id: id,
                },
            });
            return companyId

        }catch(error){
            console.error('Error while getting company', error);
            throw new Error('Could not fetch company')
        }
    },

    getByEmail: async(email) => {
        try {

            const user = await prisma.company.findUnique({
                where: {
                    email: email
                }
            })

            return user
            
        } catch (error) {
            console.error('Error getting user by email:', error)
            throw new Error(`Could not fetch company by email`)
        }
    },

    create: async (companyData) => {
        try {
            const newUser = await prisma.user.create({
                data: companyData 
            });
            return newUser;

        } catch (error) {
            console.error('Error while creating company:', error);
            throw new Error('Could not create company');
        }
    },
    
    update: async (id, companyData) => {
        try {
            const updatedCompany = await prisma.company.update({
                where: {
                    id: id
                },
                data: companyData  
            });

            return updatedCompany;

        } catch (error) {
            console.error(`Error while updating company with ID ${id}:`, error);
            throw new Error('Could not update company');
        }
    },

    delete: async (id) => {
        try {
            const deletedCompany = await prisma.company.delete({
                where: {
                    id: id
                }
            });

            return deletedCompany;
        } catch (error) {
            console.error(`Error while deleting company with ID ${id}:`, error);
            throw new Error('Could not delete company');
        }
    }

}