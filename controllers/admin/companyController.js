import BaseController from '../baseController.js';
// import { companyService } from '../../../models/company/companyService.js';
import companyService from '../../service/admin/companyService.js';

class CompanyController extends BaseController {
  constructor() {
    super(companyService); // Pasamos el servicio de empresa a la clase base
  }

  // Aquí puedes agregar métodos adicionales específicos para empresas si es necesario
}

export default new CompanyController();
