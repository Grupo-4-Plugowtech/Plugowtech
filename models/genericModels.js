import prisma from '../utils/prisma.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// export const genericModels = {
//     getAll: async ({ tableName, skip, take, orderBy, order, include = null }) => {
//         try {
//             const totalItems = await prisma[tableName].count();
    
//             const items = await prisma[tableName].findMany({
//                 skip,
//                 take,
//                 orderBy: {
//                     [orderBy]: order,
//                 },
//                 include,
//             });
    
//             return {
//                 data: items,
//                 metadata: {
//                     skip,
//                     take,
//                     totalItems,
//                     totalPages: Math.ceil(totalItems / take),
//                 }
//             };
//         } catch (error) {
//             console.error(`Error while fetching data from ${tableName}:`, error);
//             throw new Error(`Could not fetch data from ${tableName}`);
//         }
//     }
// }

class CustomError extends Error {
    constructor(message, statusCode, source, type) {
      super(message);
      this.name = this.constructor.name; // Asigna automáticamente el nombre de la clase al error
      this.statusCode = statusCode;     // Código HTTP asociado al error
      this.source = source;             // Indica de dónde proviene el error
      this.type = type || 'General';    // Tipo de error (puedes personalizar más tipos si es necesario)
  
      // Captura el stack trace (útil para depuración)
      Error.captureStackTrace(this, this.constructor);
    }
};

const tables = {
    user: [
        { field: "name", mode: "insensitive" },
        { field: "lastname", mode: "insensitive" },
        { field: "email", mode: "insensitive" }, 
        { field: "city", mode: "insensitive" }, 
        // { field: "role", mode: "insensitive" }, 
        { field: "phone"}, 
        { field: "cpf" },
        
    ],
}


class GenericModels {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getByText(searchText, companyId = "f715b2e9-f211-4cfe-8b11-44d194e60596"){
        const filters = tables[this.tableName].map((config) => {
            const condition = {
                [config.field]: {
                    startsWith: searchText,
                },
            };

            if (config.mode){
                condition[config.field].mode = config.mode;
            };
            return condition;
        })

        const where = {
            AND: companyId ? [{companyId}] : [],
            OR: filters,
        }
        const items = await prisma[this.tableName].findMany({
            where,
        });
        return items;
    }

    // Obtener todos los elementos con paginación y ordenación
    async getAll({ skip, take, orderBy, order, include = null, companyId = null}) {

        console.log(`TableName: ${this.tableName}`)
        
            const whereClause = companyId ? { companyId } : {};

            const [totalItems, items] = await prisma.$transaction([
                prisma[this.tableName].count({
                    where: whereClause,
                }),
                prisma[this.tableName].findMany({
                    where: whereClause,
                    skip,
                    take,
                    orderBy: {
                        [orderBy]: order,
                    },
                    include,
                }),
             ]);

            console.log(`skip: ${skip}, take: ${take}, orderBy: ${orderBy}, totalPages: ${totalItems}`);
    
            return {
                data: items,
                metadata: {
                    skip,
                    take,
                    totalItems,
                    totalPages: Math.ceil(totalItems / take),
                }
            };
    }

    // Obtener un elemento por ID
    async getById(id) {
            const item = await prisma[this.tableName].findUnique({
                where: { id: id }
            });
            return item;
    }
    

    // Crear un nuevo elemento
    async create(data) {
            const newItem = await prisma[this.tableName].create({
                data
            });

            return newItem;
    }

    // Actualizar un elemento existente
    async update(id, data) {
        try {
            const updatedItem = await prisma[this.tableName].update({
                where: { id: id },
                data
            });

            return updatedItem;
        } catch (error) {
            console.error(`Error while updating ${this.tableName} with ID ${id}:`, error);
            throw new Error(`Could not update ${this.tableName}`);
        }
    }

    // Eliminar un elemento por ID
    async delete(id) {
        const deletedItem = await prisma[this.tableName].delete({
            where: { id: id }
        });
        return deletedItem;
    }
}

export default GenericModels;

// where: {
//     OR: [
//         { name: { startsWith: searchText, mode: "insensitive" } }, // Busca nombres que inicien con el texto
//         { cpf: { startsWith: searchText } }, // Busca CPFs que inicien con el texto
//         { email: { startsWith: searchText, mode: "insensitive" } }, // Busca emails que inicien con el texto
//     ],
// },
// });

// const tables = {
//     user: [
//         { name: { startsWith: searchText, mode: "insensitive" } }, // Busca nombres que inicien con el texto
//         { cpf: { startsWith: searchText } }, // Busca CPFs que inicien con el texto
//         { email: { startsWith: searchText, mode: "insensitive" } }, // Busca emails que inicien con el texto
//     ]
// }

