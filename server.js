import express from 'express';
import usersHandler from './api/users/index.js';
import companyHanlder from './api/company/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/api/users', usersHandler);
app.get('/api/users/:id', usersHandler);
app.post('/api/users', usersHandler);
app.put('/api/users/:id', usersHandler);
app.delete('/api/users/:id', usersHandler);

app.get('/api/company', companyHanlder )





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}. http://localhost:${PORT}`);
})