import { userService } from "../repository/index.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.send({status:"success", payload: users});
    } catch (error) {
        req.logger.error('Cannot get users with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const changeRoleController = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userService.getById(userId);
        const userRole = user.role;
        if(userRole === "user"){
            user.role = "premium"
        } else if(userRole === "premium"){
            user.role = "user"
        } else {
            return res.json({status:"error", message: "Is not possible change user role"});
        }
        await userService.update(userId, user);
        res.send({status:"success", message:"Role modified"});
    } catch (error) {
        req.logger.error('Cannot change user role with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteUsersController = async (req, res) => {
    try {
        const result = await userService.deleteUsers();
        res.send({status:"success", payload: result});
    } catch (error) {
        req.logger.error('Cannot delete all users with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const uid = req.params.uid;
        const result = await userService.deleteUser(uid);
        res.send({status:"success", payload: result});
    } catch (error) {
        req.logger.error('Cannot delete the user with mongoose: ' + error)
        res.status(500).json({ status: "error", message: error.message });
    }
}