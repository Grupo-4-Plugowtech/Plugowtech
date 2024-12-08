// import { scorePermissionService } from "../../../models/scorePermission/scorePermissionService.js";
// import { paginationSchema } from "../../../utils/validations/validation.js";
export default async function scorePermissionHandler(req, res){
    

    switch(req.method){
        case 'GET':
            try{
                const schema = paginationSchema("scorePermission")
                const pagination = schema.safeParse(req.query);

                if(!pagination.success){
                    return res.status(400).json({ message: pagination.error.errors[0].message });
                }
                console.log(pagination);
                const scorePermissions = await scorePermissionService.getAllSP(pagination.data);
                return res.status(200).json(scorePermissions)
            }catch(error){
                return res.status(500).json({message: 'Internal Server Error', error: error.message});
            }

        case 'POST':
            try {
                
            } catch (error) {
                
            }
        case 'PUT':
            try {
                
            } catch (error) {
                
            }
        case 'DELETE':
            try {
                
            } catch (error) {
                
            }
        default:
            return res.status(405).json({message: 'Method Not Allowed'});
    }


}