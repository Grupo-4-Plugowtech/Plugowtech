import scoreController from "../../../controllers/admin/scoreController.js";



export default async function scoreHandlers(req, res){
    const { id } = req.params;
    const { searchText } = req.query;

    switch (req.method) {
        case 'GET':
          if (id) {
            return scoreController.getById(req, res);
          }else if(searchText){
            return scoreController.getByText(req, res);
          }else {
            return scoreController.getAll(req, res);
          }
        case 'POST':
          return scoreController.create(req, res);
        // case 'PUT':
        //   return scoreController.update(req, res);
        case 'DELETE':
          return scoreController.delete(req, res);
        default:
          return res.status(405).json({ message: 'Method Not Allowed' });
      }

};