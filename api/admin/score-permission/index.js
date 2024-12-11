import scorePermissionController from "../../../controllers/admin/scorePermissionController.js";
export default async function scorePermissionHandler(req, res){
    const { id } = req.params;
    const { searchText } = req.query;

    switch (req.method) {
        case 'GET':
          if (id) {
            return scorePermissionController.getById(req, res);
          }else if(searchText){
            return scorePermissionController.getByText(req, res);
          }else {
            return scorePermissionController.getAll(req, res);
          }
        // case 'POST':
        //   return scorePermissionController.create(req, res);
        case 'PUT':
          return scorePermissionController.update(req, res);
        case 'DELETE':
          return scorePermissionController.delete(req, res);
        default:
          return res.status(405).json({ message: 'Method Not Allowed' });
      }

};