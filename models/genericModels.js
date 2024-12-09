import prisma from '../utils/prisma.js'

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

const queryFields = {
    user: [
        { field: "name", mode: "insensitive" },
        { field: "lastname", mode: "insensitive" },
        { field: "email", mode: "insensitive" }, 
        { field: "city", mode: "insensitive" },
        { field: "companyId", mode: "insensitive" }, 
        // { field: "role", mode: "insensitive" }, 
        { field: "phone"}, 
        { field: "cpf" },
        
    ],
    company: [
        { field: "email", mode: "insensitive" },
        { field: "cnpj", mode: "insensitive" },
        { field: "name", mode: "insensitive" },
    ],
}


class GenericModels {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getByText({ searchText, skip, take, orderBy, order, companyId = null }){

        if(!queryFields[this.tableName]){
            throw new Error(`Não se encontraram os campos de consultas para ${this.tableName}!`);
        }
        const filters = queryFields[this.tableName].map((config) => {
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

        const whereCLauseFilters = {
            AND: companyId ? [{companyId}] : [],
            OR: filters,
        }

        // const whereClause = companyId ? { companyId } : {};
        console.log(`From getByText, skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}, companyId: ${companyId}, searchText: ${searchText}`);

        const [totalItems, items] = await prisma.$transaction([
            
            prisma[this.tableName].count({
                where: whereCLauseFilters,
            }),
            prisma[this.tableName].findMany({
                where: whereCLauseFilters,
                skip,
                take,
                orderBy: {
                    [orderBy]: order,
                },
            })
        ]);
 
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

    // Obtener todos los elementos con paginación y ordenación
    async getAll({ skip, take, orderBy, order, include = null, companyId = null}) {

        
        
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
            console.log(`TableName: ${this.tableName}`)
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
    async getById(id, companiId = null ) {

        const whereClause = companiId ? { id, companiId } : { id };

            const item = await prisma[this.tableName].findUnique({
                where: whereClause,
            });
            return item;
    }
    

    // Crear un nuevo elemento
    async create(data, companyId = null) {
            if (companyId){
                data.companyId = companyId;
            }
            const newItem = await prisma[this.tableName].create({
                data
            });

            return newItem;
    }

    // Actualizar un elemento existente
    async update(id, data, companyId = null) {
        const whereClause = companyId ? { id, companyId } : { id };
            const updatedItem = await prisma[this.tableName].update({
                where: whereClause,
                data
            });

            return updatedItem
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

// const queryFields = {
//     user: [
//         { name: { startsWith: searchText, mode: "insensitive" } }, // Busca nombres que inicien con el texto
//         { cpf: { startsWith: searchText } }, // Busca CPFs que inicien con el texto
//         { email: { startsWith: searchText, mode: "insensitive" } }, // Busca emails que inicien con el texto
//     ]
// }

