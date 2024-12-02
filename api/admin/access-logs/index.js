import { accessLogService } from "../../../models/accessLog/accessLogService.js";

export default async function hanlder(req, res){
    switch (req.method) {
        case 'GET':
            try {
                const accessLogs = await accessLogService.getAllAccess();
                
                if(accessLogs){
                    return res.status(200).json(accessLogs);
                }

            } catch (error) {
                return res.status(500).json({ message: 'Error getting access logs', error: error.message})
            }
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}