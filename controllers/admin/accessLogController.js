import BaseController from '../baseController.js';
import accessLogService from '../../service/admin/accessLogService.js';

class AccessLogController extends BaseController {
  constructor() {
    super(accessLogService); // Pasamos el servicio de empresa a la clase base
  }

  // Aquí puedes agregar métodos adicionales específicos para empresas si es necesario
}

export default new AccessLogController();
