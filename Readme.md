## Estrutura inicial de pastas

├── api/
│   └── users/
│       └── index.js         # Endpoints para usuarios (Controlador)
│   └── auth/
│       └── login.js         # Ruta para autenticación de login
│       └── register.js      # Ruta para registro de usuarios
├── models/
│   └── user/
│       └── userModels.js    # Lógica de base de datos para usuarios (Modelo)
│       └── userService.js   # Lógica de negocio para usuarios
│       └── validation.js    # Validaciones de entrada para usuarios
├── middleware/
│   └── auth.js             # Middleware para autenticación
├── utils/
│   └── prisma.js           # Conexión con Prisma
│   └── seed.js             # Función para copular dados no db.
|__ server.js               # Servidor básico temporal para testes da api

## Commandos
1. npm run dev              # Executar o servidor na porta 3000
1. node utils/seed.js       # Para copular dados fiticios no db. (Os dados já estão no banco de dados) [Opcional]


## Accesso de rotas disponiveis (Exemplos de consultas)
Método GET padrão a traves de url no browser

Obter dados de todos os úsuarios ---> http://localhost:3000/api/users 
Obter dados de um úsuario pelo id ---> http://localhost:3000/api/users/0afa8783-e285-4892-873d-cd0c5ccc31e9

Métodos POST, UPDATE e DELETE disponiveis a traves de ferramentas para test de API
1. Insomnia
2. Postman



