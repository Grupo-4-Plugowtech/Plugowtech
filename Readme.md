# Estrutura inicial do projeto

## 📂 Pastas

```bash
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
│   └── seed.js             # Función para poblar la base de datos
└── server.js               # Servidor básico temporal para pruebas de la API
```
## 🚀 Comandos disponiveis

1. **Desenvolver localmente:**
   - `npm run dev` - Executa o servidor de prova na porta `3000`.
2. **Copular base de dados:**
   - `node utils/seed.js` - Para copular databse com dados fiticios (opcional).

## 🌐 Metodos e acceso a rotas disponiveis

Método GET padrão no navegador: 
    Obter dados de todos os úsuarios 👉🏻 http://localhost:3000/api/users 
    Obter dados de um úsuario pelo id 👉🏻 http://localhost:3000/api/users/0afa8783-e285-4892-873d-cd0c5ccc31e9

Métodos POST, UPDATE e DELETE disponiveis a traves de ferramentas para test de API
1. Insomnia **Download** here 👉🏻 https://docs.insomnia.rest/insomnia/install
2. Postman **Download** here 👉🏻 https://www.postman.com/downloads/
