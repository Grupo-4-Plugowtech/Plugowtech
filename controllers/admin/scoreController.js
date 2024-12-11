import BaseController from '../baseController.js';
import scoreService from '../../service/admin/scoreService.js';

class ScoreController extends BaseController {
  constructor() {
    super(scoreService); // Pasamos el servicio de empresa a la clase base
  }

  // Aquí puedes agregar métodos adicionales específicos para empresas si es necesario
}

export default new ScoreController();
