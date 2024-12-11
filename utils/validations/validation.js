import { isCPF, isCNPJ } from 'brazilian-values'; 
import { parseISO, isValid, isBefore, isAfter, startOfToday } from 'date-fns';
import { z } from 'zod'
const brazilAreaCodes = [
  "11", "12", "13", "14", "15", "16", "17", "18", "19", // São Paulo
  "21", "22", "24",                                    // Río de Janeiro
  "27", "28",                                          // Espírito Santo
  "31", "32", "33", "34", "35", "37", "38",            // Minas Gerais
  "41", "42", "43", "44", "45", "46",                  // Paraná
  "47", "48", "49",                                    // Santa Catarina
  "51", "53", "54", "55",                              // Río Grande del Sur
  "61", "62", "63",                                    // Centro-Oeste
  "64", "65", "66", "67",                              // Mato Grosso/Mato Grosso do Sul
  "68", "69",                                          // Acre/Rondônia
  "71", "73", "74", "75", "77",                        // Bahía
  "79",                                                // Sergipe
  "81", "82",                                          // Pernambuco/Alagoas
  "83", "84", "85", "86", "87",                        // Nordeste
  "88", "89",                                          // Ceará/Piauí
  "91", "92", "93", "94", "95", "96", "97", "98", "99" // Norte
];

// Options for query by "OrderBy" in tables
const orderByOptions = {
  user: z.enum(['cpf', 'city', 'birth_date', 'approved_terms', 'companyId', 'createdAt']).default('createdAt'),
  company: z.enum(['email', 'cnpj', 'name', 'createdAt']).default('createdAt'),
  scorePermission: z.enum(['companyId', 'points', 'createdAt']).default('createdAt'),
  accessLog: z.enum(['userId', 'ipAddress', 'createdAt']).default('createdAt'),
  score: z.enum(['points', 'userId', 'createdAt']).default('createdAt'),
}

const tables = {
  user: {
    queryfields: [
      { field: "name", mode: "insensitive", type: "string" },
      { field: "lastname", mode: "insensitive", type: "string" },
      { field: "email", mode: "insensitive", type: "string" },
      { field: "city", mode: "insensitive", type: "string" },
      { field: "companyId", mode: "insensitive", type: "string" },
      { field: "role", mode: "insensitive", type: "enum" },
      { field: "phone", type: "string" },
      { field: "cpf", type: "string" },
    ],
    relationShips: {

    },
    enum: {
      role: ["company", "admin", "associated"],
    }
  },
  company: {
    queryfields: [
        { field: "email", mode: "insensitive", type: "string" },
        { field: "cnpj", mode: "insensitive", type: "string" },
        { field: "name", mode: "insensitive", type: "string" },
    ],
    enum: [],
  },
  scorePermission: {
    queryfields: [
        { field: "companyId", mode: "insensitive", type: "string" },
        { field: "points", type: "number" },
        { field: "status", mode: "insensitive", type: "enum" },
    ],
    enum: {
      status: ["pending", "approved", "rejected"],
    }
  },
  accessLog: {
    queryfields: [],
    enum: []
  },
  score: {
    queryfields: [
      { field: "points", type: "number" },
    ],
    enum: []
  },
};
// Schema for validation data inputed
const schema = {
  user: z.object({
    name: z.string().min(1, { message: "O nome é obrigatorio" }),
    lastname: z.string().min(1, "O sobrenome é obrigatorio"),
    email: z.string().min(1, { message: "O campo email é obrigatorio" }).email("O email é invalido"),
    password: z.string().min(8, { message: "A senha deve conter como minimo 8 caracteres"} ),
    phone: z.string().min(1,"O número de telefone é obrigatorio!").length(14, { message: "O Número de telefone no total deve conter 14 caracteres!"} ).superRefine((value, ctx) => { validatePhoneBR(value, ctx) }),
    cpf: z.string().length(11,{ message: "O CPF deve conter 11 caracteres!" }),
    // .superRefine((value, ctx) => {
    //   if (!isCPF(value)) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "O CPF é invalido.",
    //     });
    //   }
  // }),
    city: z.string().min(1, "A cidade é obrigatoria!"),
    birth_date: z.string()
    .refine(value => {
      const date = parseISO(value)
      return isValid(date) && isBefore(date, MAX_DATE) && isAfter(date, MIN_DATE)
    }, {
      message: "A data de nascimento precisa ser uma data válida!"
    }).transform((value) => parseISO(value)),
    approved_terms: z.boolean().default(false, "Os termos devem ser aceitos!"),
    role: z.enum(['admin', 'company', 'associated']).optional().default('associated'),
    companyId: z.string().min(32, { message: "A empresa para o vinculo é obrigadoria!"} )
  }),

  company: z.object({
    name: z.string().min(1, { message: "O nome é obrigatorio" }),
    email: z.string().min(1, { message: "O campo email é obrigatorio" }).email("O email é invalido"),
    cnpj: z.string()
      //   .superRefine((value, ctx) => {
      //     console.log(`CNPJ: ${value}`)
      // if (!isCNPJ(value)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "O CNPJ é invalido.",
      //   });
      // }
  // }),
  }),
  score: z.object({
    points: z.number().min(0, "Os pontos devem ser um número positivo!"),
    userId: z.string().min(32, { message: "O usuário para o vinculo é obrigadorio!"} ),
    companyId: z.string().min(32, { message: "A empresa para o vinculo é obrigadorio!"} ),
    scorePermissionId: z.string().min(32, { message: "O vinculo com a permissão de pontos é obrigatoria!"} ),
    description: z.string().min(1, { message: "A descrição é um campo obrigatorio!"}),
  }),
  
}

export const paginationSchema = (tableName) => {

  if (!orderByOptions[tableName] || !tables[tableName]) {
    throw new Error(`Parametros de ordenação ou de consultas não definidos, em: ${tableName}!`);
  }

  const orderByFields = orderByOptions[tableName];
  const queryFields = tables[tableName]?.queryfields;

  console.log(queryFields)

    return z.object({
      skip: z.preprocess((value) => (value === undefined || value === null ? 0 : parseInt(value, 10)), z.number().int().nonnegative().optional()),
      take: z.preprocess((value) => (value === undefined || value === null ? 5 : parseInt(value, 10)), z.number().int().positive().min(1).max(100, { message: "Take value must be between 1 and 100" })),
      orderBy: orderByFields,
      order: z.enum(['asc', 'desc']).optional().default('desc'),
      searchText: z.string().optional(),
      companyId: z.string().optional(),
    }).transform((data) => {
      const { orderBy, searchText, ...rest } = data;
      console.log(data)
  
      // Buscar los detalles del campo seleccionado en `queryfields`
      // const fieldDetails = queryFields.map((field) => {
      //   if (field.field === orderBy){
      //     return field
      //   }else
      //   return
      // }).filter((field) => field)

      

        const filters = queryFields.map((config) => {
        const { field, mode, type } = config;
      
        if (type === "string") {
          return {
            [field]: {
              startsWith: searchText,
              ...(mode && { mode }),
            },
          };
        }
      
        if (type === "number") {
          const numericValue = Number(searchText);
          if (!isNaN(numericValue)) {
            return {
              [field]: { equals: numericValue }, // Solo busca si es un número válido
            };
          }
        }
      
        if (type === "enum" && tables[tableName].enum?.[field]?.includes(searchText)) {
          return {
            [field]: { equals: searchText }, // Búsqueda exacta para enums
          };
        }
      
        return null; // Ignora campos que no tienen un tipo definido
      }).filter(Boolean); // Elimina los filtros nulos
  
      if (!queryFields) {
        throw new Error(`The field "${orderBy}" is not a valid queryable field for table "${tableName}".`);
      }
      console.log(`filters: ${JSON.stringify(filters, null, 2)}`)
      // Retornar la estructura con detalles del campo y los datos validados
      return {
        ...rest,
        orderBy,
        filters,
        searchText
      };
    });
  };



function validatePhoneBR(value, ctx){

    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O número de telefone é obrigatorio"
      });
      return;
    }

    if (!value.startsWith("+55")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O número de telefone debe conter o código do pais (+55)",
      });
      return;
    }

    // Extraer el código de área (3er y 4to dígito)
    const areaCode = value.slice(3, 5);

    // Validar si el código de área es válido
    if (!brazilAreaCodes.includes(areaCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `O código de area (${areaCode}) não é valido.`,
      });
    }
};

const MIN_DATE = "1930-01-01";
const MAX_DATE = startOfToday();

// Validación para crear un nuevo usuario
export const validationSchema = (tableName) => {
  const zodObjectValidation = schema[tableName]
  if(!zodObjectValidation){
    throw new Error(`O objeto para validação de ${tableName} não existe!`);
  }
  return zodObjectValidation
}
// Validación para actualizar un usuario
// export const updateUserSchema = createUserSchema.partial(); // Solo se requiere lo que se está actualizando
