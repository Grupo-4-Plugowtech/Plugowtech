import BaseController from '../baseController.js';
import scorePermissionService from '../../service/admin/scorePermissionService.js';

class ScorePermissionController extends BaseController {
  constructor() {
    super(scorePermissionService); // Pasamos el servicio de empresa a la clase base
  }

  // Aquí puedes agregar métodos adicionales específicos para empresas si es necesario
}

export default new ScorePermissionController();