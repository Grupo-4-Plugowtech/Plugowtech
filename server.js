import express from 'express';
import usersHandler from './api/admin/users/index.js';
import companiesHandler from './api/admin/companies/index.js';
import accessLogsHandler from './api/admin/access-logs/index.js'
import scorePermissionHandler from './api/admin/score-permission/index.js';
import scoreHandlers from './api/admin/score/index.js';



import companyHandler from './api/company/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Rotas para o usuário com rol admin (Administrador-OSNIR)
//--Rota Users
app.get('/api/admin/users/:id', usersHandler);
app.get('/api/admin/users', usersHandler);
app.post('/api/admin/users', usersHandler);
app.put('/api/admin/users/:id', usersHandler);
app.delete('/api/admin/users/:id', usersHandler);

//-Rota Companies
app.get('/api/admin/companies/:id', companiesHandler);
app.get('/api/admin/companies', companiesHandler);
app.post('/api/admin/companies', companiesHandler);
app.put('/api/admin/companies/:id', companiesHandler);
app.delete('/api/admin/companies/:id', companiesHandler);

//--Rota Score Permissions
app.get('/api/admin/score-permission', scorePermissionHandler);
app.put('/api/admin/score-permission/:id', scorePermissionHandler);
app.delete('/api/admin/score-permission/:id', scorePermissionHandler);



//--Rota Access Logs
app.get('/api/admin/access-logs', accessLogsHandler)

//--Rota Score
app.get('/api/admin/score/:id', scoreHandlers )
app.get('/api/admin/score', scoreHandlers )
app.post('/api/admin/score', scoreHandlers )
app.put('/api/admin/score/:id', scoreHandlers )
app.delete('/api/admin/score/:id', scoreHandlers )


//--Rotas para o usúario com o rol company (Lojas)
app.get('/api/company', companyHandler )


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}. http://localhost:${PORT}`);
})


