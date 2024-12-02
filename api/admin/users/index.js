import { userService } from "../../../models/user/userService.js";
import { paginationSchema } from "../../../models/user/validation.js";

export default async function usersHandler(req, res) {
    const { id } = req.params;

    switch (req.method) {
        case 'GET':
            if (id) {
                try {
                    const userById = await userService.getUserById(id);
                    if (userById) {
                        return res.status(200).json(userById);
                    } else {
                        return res.status(404).json({ message: 'User Not Found' });
                    }
                } catch (error) {
                    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
                }
            }else {
                try {
                    const pagination = paginationSchema.safeParse(req.query);
                    if(!pagination.success) {
                        return res.status(400).json({ message: pagination.error.errors[0].message });
                    }
                    const userAll = await userService.getAllUsers(pagination.data);
            
                    return res.status(200).json(userAll);  
                } catch (error) {
                    console.error('Error fetching users:', error); 
                    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
                }
            }
        
        case 'POST':
            try {
                const newUser = await userService.createUser(req.body); 
                console.log(`newUser: ${newUser}`)
                return res.status(201).json(newUser);
            } catch (error) {
                return res.status(500).json({ message: 'Error creating user', error: error.message });
            }

        case 'PUT':
            try {
                const updatedUser = await userService.updateUser(id, req.body);  
                if (updatedUser) {
                    return res.status(200).json(updatedUser);
                } else {
                    return res.status(404).json({ message: 'User Not Found' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error updating user', error: error.message });
            }

        case 'DELETE':
            try {
                const deletedUser = await userService.deleteUser(id);
                if (deletedUser) {
                    return res.status(200).json({ message: 'User deleted successfully' });
                } else {
                    return res.status(404).json({ message: 'User Not Found' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting user', error: error.message });
            }

        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
