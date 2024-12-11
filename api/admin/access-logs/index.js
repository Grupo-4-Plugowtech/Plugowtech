import accessLogController from "../../../controllers/admin/accessLogController.js";

export default async function accessLogsHandler(req, res){
    switch (req.method) {
        case 'GET':
                return await accessLogController.getAll(req, res)
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}


