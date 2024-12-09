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

const orderByOptions = {
  user: z.enum(['cpf', 'city', 'birth_date', 'approved_terms', 'role', 'companyId', 'createdAt']).optional().default('createdAt'),
  scorePermission: z.enum(['company', 'points', 'status', 'createdAt']).optional().default('createdAt'),
  company: z.enum(['email', 'cnpj', 'name', 'createdAt']).optional().default('createdAt'),
}

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
    

  })
  
}

export const paginationSchema = (option) => {

    if (!orderByOptions[option]) {
      throw new Error(`Invalid option for orderBy: ${option}`);
    }
    return z.object({
      skip: z.preprocess((value) => (value === undefined || value === null ? 0 : parseInt(value, 10)), z.number().int().nonnegative().optional()),
      take: z.preprocess((value) => (value === undefined || value === null ? 5 : parseInt(value, 10)), z.number().int().positive().min(1).max(100, { message: "Take value must be between 1 and 100" })),
      orderBy: orderByOptions[option],
      order: z.enum(['asc', 'desc']).optional().default('desc'),
      searchText: z.string().optional(),
    });

} 

function validatePhoneBR(value, ctx){

    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O número de telefone é obrigatorio)",
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
