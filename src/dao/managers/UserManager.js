import { userModel } from '../models/users.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';

const managerAccess = new ManagerAccess();

export default class UserManager{

    constructor(){
        this.model = userModel;
    }

    async get(){
        try {
            await managerAccess.saveLog('GET all users');
            const result = await this.model.find();;
            return result;
        } catch (error) {
            console.log('Cannot get users in manager with mongoose: '+error)
        }
    }

    async post(user){
        try {
            await managerAccess.saveLog('CREATE a user');
            const result = await this.model.create(user);
            return result;
        } catch (error) {
            console.log('Cannot post the user in manager with mongoose: '+error)     
        }
    }

    async getByCart(cid){
        try {
            await managerAccess.saveLog('GET a user by cart');
            const result = await this.model.findOne({cart: cid})
            return result;
        } catch (error) {
            console.log('Cannot get user by cart ID in manager with mongoose: '+error)
        }
    }

    async getById(uid){
        try {
            await managerAccess.saveLog('GET a user by ID');
            const result = await this.model.findOne({_id: uid});
            return result;
        } catch (error) {
            console.log('Cannot get user by ID in manager with mongoose: '+error)
        }
    }

    async put(uid, user){
        try {
            await managerAccess.saveLog('UPDATE a user');
            const result = await this.model.updateOne({_id: uid}, user);
            return result;
        } catch (error) {
            console.log('Cannot get user by ID in manager with mongoose: '+error)
        }
    }

    async delete(){
        try{
            await managerAccess.saveLog('DELETE old users');
            const fechaActual = new Date();
            const tresMinutosAtras = new Date(fechaActual.getTime() - (3 * 60 * 1000));
            let result = await this.model.deleteMany({
                last_login: { $lt: tresMinutosAtras }
            });
            return result;
        }catch(error){
            console.log('Cannot delete old users in manager with mongoose: '+error);
        }
    }
}
