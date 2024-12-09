import {
  paginationSchema,
  validationSchema,
} from "../utils/validations/validation.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parseISO, isValid, isBefore, isAfter, startOfToday } from "date-fns";

class BaseController {
  constructor(service) {
    this.service = service;
    this.tableName = service.tableName; // El servicio correspondiente, como `userService` o `companyService`
  }

  async getByText(req, res) {

    const schema = paginationSchema(this.tableName);
    const result = schema.safeParse(req.query);
    try {
      const items = await this.service.getByText(result.data);
      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum registro encontrado!", items });
      }

      return res.status(200).json(items);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const item = await this.service.getById(id);
      if (item) {
        return res.status(200).json({data: item});
      }
      return res.status(404).json({ message: `${this.tableName} not found`, data: item });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const schema = paginationSchema(this.tableName);
      const result = schema.safeParse(req.query);

      if (!result.success) {
        return res
          .status(400)
          .json({ message: result.error.errors[0].message });
      }
      console.log(result);
      const items = await this.service.getAll(result.data);

      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum registro encontrado!", data: items.data });
      }

      return res.status(200).json(items);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const schema = validationSchema(this.tableName);
      const validate = schema.safeParse(req.body);
      console.log(validate);
      if (!validate.success) {
        const field = validate.error.errors[0];
        if (field.message === "Required") {
          return res
            .status(400)
            .json({ message: `O ${field.path} é obrigatorio` });
        }
        console.log(validate.error.errors);
        return res.status(400).json({ message: field.message });
      }
      const newItem = await this.service.create(validate.data);
      if (newItem) {
        return res
          .status(201)
          .json({ message: `Successfully created ${this.tableName}` });
      }
      return res
        .status(201)
        .json({ message: `Failed to create ${this.tableName}` });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.error(`Error creating in ${this.tableName}:`, error);
        return res.status(409).json({ message: `O ${error.meta.target}, já está em uso`, error: error.message});
      }
      console.error(`Error creating in ${this.tableName}:`, error);
      return res
        .status(500)
        .json({
          message: `Error creating in ${this.tableName}`,
          error: error.message,
        });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      await this.service.update(id, req.body);
      return res
        .status(200)
        .json({ message: `${this.tableName} updated successfully` });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.error(`Error updating in ${this.tableName}:`, error);
        return res.status(409).json({ message: `O ${error.meta.target}, já está em uso`, error: error.message});
      }
      console.error(`Error updating in ${this.tableName}`, error);
      return res
        .status(500)
        .json({
          message: `Error updating in ${this.tableName}`,
          error: error.message,
        });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.service.delete(id);

      return res
        .status(200)
        .json({ message: `${this.tableName} deleted successfully` });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.error(
          `Error deleting in ${this.tableName} with ID: (${id}), not found`,
          error
        );
        return res
          .status(404)
          .json({ message: `Error deleting in ${this.tableName}, not found` });
      }
      return res
        .status(500)
        .json({
          message: `Error deleting in ${this.service.modelName}`,
          error: error.message,
        });
    }
  }
}

// } catch (error) {
//   if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
//       // El error P2025 indica que el registro no existe.
//       console.error(`Error: deleting ${this.tableName} with ID ${id} not found`);
//       return null; // Devuelve null o maneja el caso según tus necesidades.
//   } else {
//       // Otros errores que puedan ocurrir.
//       console.error(`Unexpected error while deleting ${this.tableName} with ID ${id}:`, error);
//       throw new Error(`Could not delete ${this.tableName}`);
//   }
// }

export default BaseController;
