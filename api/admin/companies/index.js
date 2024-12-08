import { companyService } from '../../../models/company/companyService.js'
import companyController from '../../../controllers/admin/companyController.js';


export default async function companiesHandler(req, res){
    const { id } = req.params;

    switch (req.method) {
        case 'GET':
          if (id) {
            return companyController.getById(req, res);
          } else {
            return companyController.getAll(req, res);
          }
        case 'POST':
          return companyController.create(req, res);
        case 'PUT':
          return companyController.update(req, res);
        case 'DELETE':
          return companyController.delete(req, res);
        default:
          return res.status(405).json({ message: 'Method Not Allowed' });
      }

}