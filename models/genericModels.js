import prisma from "../utils/prisma.js";

class CustomError extends Error {
  constructor(message, statusCode, source, type) {
    super(message);
    this.name = this.constructor.name; // Asigna automáticamente el nombre de la clase al error
    this.statusCode = statusCode; // Código HTTP asociado al error
    this.source = source; // Indica de dónde proviene el error
    this.type = type || "General"; // Tipo de error (puedes personalizar más tipos si es necesario)

    // Captura el stack trace (útil para depuración)
    Error.captureStackTrace(this, this.constructor);
  }
}

// const operatorMap = {
//     string: (field, searchText, mode) => ({
//       [field]: {
//         startsWith: searchText,
//         ...(mode && { mode }),
//       },
//     }),
//     number: (field, searchText) => {
//       const numericValue = Number(searchText);
//       if (isNaN(numericValue)) return null;
//       return { [field]: { equals: numericValue } };
//     },
//     enum: (field, searchText) => ({
//       [field]: { equals: searchText },
//     }),
//   };

const tables = {
  user: {
    queryfields: [
      { field: "name", mode: "insensitive", type: "string" },
      { field: "lastname", mode: "insensitive", type: "string" },
      { field: "email", mode: "insensitive", type: "string" },
      { field: "city", mode: "insensitive", type: "string" },
      { field: "companyId", mode: "insensitive", type: "string" },
    //   { field: "role", mode: "insensitive", type: "enum" },
      { field: "phone", type: "string" },
      { field: "cpf", type: "string" },
    ],
    relationShips: {

    }
  },
  company: {
    queryfields: [
        { field: "email", mode: "insensitive", type: "string" },
        { field: "cnpj", mode: "insensitive", type: "string" },
        { field: "name", mode: "insensitive", type: "string" },
    ]
  },
  scorePermission: {
    queryfields: [
        { field: "companyId", mode: "insensitive", type: "string" },
        { field: "points", mode: "insensitive", type: "number" },
        // { field: "status", mode: "insensitive", type: "enum" },
    ]
  },
};

class GenericModels {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getByText({
    filters,
    searchText,
    skip,
    take,
    orderBy,
    order,
    companyId = null,
  }) {
    // if (!tables[this.tableName].queryfields) {
    //   throw new Error(
    //     `Não se encontraram os campos de consultas para ${this.tableName}!`
    //   );
    // }
    // console.log("Executaaaaaaaaaaaaaaaaaaaando getBytext")
    // const filters = tables[this.tableName].queryfields.map((config) => {
    //     const { field, mode, type } = config;
      
    //     if (type === "string") {
    //       return {
    //         [field]: {
    //           startsWith: searchText,
    //           ...(mode && { mode }),
    //         },
    //       };
    //     }
      
    //     if (type === "number") {
    //       const numericValue = Number(searchText);
    //       if (!isNaN(numericValue)) {
    //         return {
    //           [field]: { equals: numericValue }, // Solo busca si es un número válido
    //         };
    //       }
    //     }
      
    //     if (type === "enum") {
    //       return {
    //         [field]: { equals: searchText }, // Búsqueda exacta para enums
    //       };
    //     }
      
    //     return null; // Ignora campos que no tienen un tipo definido
    //   }).filter(Boolean); // Elimina los filtros nulos

    const whereCLauseFilters = {
      AND: companyId ? [{ companyId }] : [],
      OR: filters,
    };

    console.log(
      `From getByText in ${this.tableName}, skip: ${skip}, take: ${take}, orderBy: ${JSON.stringify(orderBy, null, 2)}, order: ${order}, companyId: ${companyId ? companyId : undefined }, searchText: ${searchText ? searchText : undefined}`
    );

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
      }),
    ]);

    return {
      data: items,
      metadata: {
        skip,
        take,
        totalItems,
        totalPages: Math.ceil(totalItems / take),
      },
    };
  }

  // Obtener todos los elementos con paginación y ordenación
  async getAll({
    skip,
    take,
    orderBy,
    order,
    include = null,
    companyId = null,
  }) {
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
    console.log(`TableName: ${this.tableName}`);
    console.log(
      `skip: ${skip}, take: ${take}, orderBy: ${orderBy}, order: ${order}`
    );
    
    return {
      data: items,
      metadata: {
        skip,
        take,
        totalItems,
        totalPages: Math.ceil(totalItems / take),
      },
    };
  }

  // Obtener un elemento por ID
  async getById({ id, companiId = null, scorePermissionId = null }) {
    const whereClause = companiId ? { id, companiId } : scorePermissionId ? { scorePermissionId } : { id };
    const item = await prisma[this.tableName].findUnique({
      where: whereClause,
    });
    return item;
  }

  // Crear un nuevo elemento
  async create(data, companyId = null) {
    if (companyId) {
      data.companyId = companyId;
    }
    const newItem = await prisma[this.tableName].create({
      data,
    });

    return newItem;
  }

  // Actualizar un elemento existente
  async update(id, data, companyId = null) {
    const whereClause = companyId ? { id, companyId } : { id };
    const updatedItem = await prisma[this.tableName].update({
      where: whereClause,
      data,
    });

    return updatedItem;
  }

  // Eliminar un elemento por ID
  async delete(whereParams) {
    const deletedItem = await prisma[this.tableName].delete({
      where: whereParams,
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
//     user.queryfields: [
//         { name: { startsWith: searchText, mode: "insensitive" } }, // Busca nombres que inicien con el texto
//         { cpf: { startsWith: searchText } }, // Busca CPFs que inicien con el texto
//         { email: { startsWith: searchText, mode: "insensitive" } }, // Busca emails que inicien con el texto
//     ]
// }
