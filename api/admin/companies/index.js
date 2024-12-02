import { companyService } from '../../../models/company/companyService.js'


export default async function handler(req, res){
    const { id } = req.params;
    switch(req.method){
        case 'GET':
            if(id){
                try {
                    const company = await companyService.getCompanyById(id);
                    if (company){
                        return res.status(200).json(company);
                    }else{
                        return res.status(404).json({message: 'Company not found'})
                    }
                } catch (error) {
                    return res.status(500).json({message: 'Internal Server Error', error: error.message});
                }

            }else{
                try{
                    const companies = await companyService.getAllCompanies();

                    if (companies){
                        return res.status(200).json(companies);
                    }else{
                        return res.status(404).json({message: 'Companies not found'})
                    }
                }catch(error){
                    return res.status(500).json({message: 'Internal Server Error', error: error.message});
                }

            };
        case 'POST':
            try {
                const newCompany = await companyService.createCompany(req.body);

                if(newCompany){
                    return res.status(201).json({ message: 'Company Created'});
                }

            } catch (error) {
                return res.status(500).json({ message: 'Error creating company', error: error.message });
            }

        case 'PUT':
            try {
                const updatedCompany = await companyService.updateCompany(id, req.body);  
                if (updatedCompany) {
                    return res.status(200).json({ message: 'Updated company'});
                } 

            } catch (error) {
                return res.status(500).json({ message: 'Error updating company', error: error.message });
            }

        case 'DELETE':
            try {
                const deletedCompany = await companyService.deleteCompany(id);

                if (deletedCompany) {
                    return res.status(200).json({ message: 'Company deleted successfully' });
                } 
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting Company', error: error.message });
            }


        default:
            return res.status(405).json({message: 'Method Not Allowed'});
    }
}