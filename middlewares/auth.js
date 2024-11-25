import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Espera que o token venha no formato 'Bearer token'

    if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token
    req.user = decoded; // Anexa as informações do usuário à requisição
    next(); // Continua para o próximo middleware ou função de rota
    } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}
