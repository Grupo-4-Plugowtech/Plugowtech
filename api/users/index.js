import { user } from "../../models/user/userModels.js";

export default async function handler(req, res){
    if(req.method === 'GET'){
        const userAll = await user.getAll();
        res.status(200).json(userAll);
    }
}


