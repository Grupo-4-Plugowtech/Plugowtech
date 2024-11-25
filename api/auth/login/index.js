import { loginService } from "../../services/authService";
import { z } from "zod";

export default async function handler(req, res) {
    if (req.method === "POST") {
    try {
      // Definir a validação usando Zod
        const schema = z.object({
        email: z.string().email(), // Valida que o email está correto
        password: z.string().min(6), // Valida que a senha tem no mínimo 6 caracteres
        });

      // Validar os dados recebidos
    const { email, password } = schema.parse(req.body);

      // Tenta fazer o login e gerar um token
        const token = await loginService(email, password);

      // Retorna o token se a autenticação for bem-sucedida
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    } else {
    res.status(405).json({ error: "Método não permitido" });
    }
}
