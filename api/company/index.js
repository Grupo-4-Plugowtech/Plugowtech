import { companyService } from "../../models/company/companyService.js";


export default async function handler(req, res){
    switch(req.method){
        case 'GET':
            try{
                const companies = await companyService.getAllCompanies();
                return res.status(200).json(companies);
            }catch(error){
                return res.status(500).json({message: 'Internal Server Error', error: error.message});
            }
        default:
            return res.status(405).json({message: 'Method Not Allowed'});
    }
}