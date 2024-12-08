import BaseController from '../baseController.js';
// import { userService } from '../models/user/userService.js'
import UserService from '../../service/admin/userService.js'

class UserController extends BaseController {
  constructor() {
    super(UserService); // Pasamos el servicio de usuario a la clase base
  }

  // Aquí puedes agregar métodos adicionales específicos para usuarios si es necesario
}

export default new UserController();
