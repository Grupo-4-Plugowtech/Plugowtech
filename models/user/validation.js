import { z } from 'zod'

// Validación para la paginación
export const paginationSchema = z.object({
  skip: z.preprocess((value) => parseInt(value, 10), z.number().int().nonnegative().optional().default(0)),
  take: z.preprocess((value) => parseInt(value, 10), z.number().int().positive().min(1).max(100, { message: "Take value must be between 1 and 100" }).default(5)),
  orderBy: z.enum(['cpf', 'city', 'birth_date', 'approved_terms', 'role', 'companyId', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Validación para crear un nuevo usuario
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  // Otras validaciones de campos...
});

// Validación para actualizar un usuario
export const updateUserSchema = createUserSchema.partial(); // Solo se requiere lo que se está actualizando
