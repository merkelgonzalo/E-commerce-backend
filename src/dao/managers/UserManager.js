import { userModel } from '../models/users.model.js';
import ManagerAccess from '../managers/ManagerAccess.js';
import { config } from '../../config/config.js';
import { transporter } from "../../utils/email.js";

const managerAccess = new ManagerAccess();

export default class UserManager{

    constructor(){
        this.model = userModel;
    }

    async get(query, options){
        try {
            await managerAccess.saveLog('GET all users');
            const result = await this.model.paginate(query, options);
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
            const result = await this.model.findOne({cart: cid});
            return result;
        } catch (error) {
            console.log('Cannot get user by cart ID in manager with mongoose: '+error)
        }
    }

    async getByEmail(email){
        try {
            console.log(email);
            await managerAccess.saveLog('GET a user by email');
            const result = await this.model.findOne({email: email});
            console.log(result);
            return result;
        } catch (error) {
            console.log('Cannot get user by email in manager with mongoose: '+error)
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
            const currentDate = new Date();
            //Fijado en 3 minutos para pruebas
            const deletionDate = new Date(currentDate.getTime() - (3 * 60 * 1000));
            const users = await this.model.find();
            let emailsToDelete = []; //Array con los emails de cuentas a eliminar
            //Filtro de emails a eliminar
            users.forEach(user => {
                if(user.last_login < deletionDate){
                    emailsToDelete.push(user.email);
                }
            });
            //Envío de mails a las cuentas
            emailsToDelete.forEach(email => {
                const contenido = transporter.sendMail({
                    from: config.gmail.emailAdmin,
                    to: email,
                    subject: "Account deleted due to inactivity ⚠️😢",
                    html: `<div>
                    <h1>Account deleted due to inactivity</h1>
                    <img src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2014/01/Inactividad.jpg" style="width:250px"/>
                    <p>We inform you that your account has been deleted due to inactivity but don't worry, you can register again with the same email.</p>
                    </div>`
                });
            });
            let result = await this.model.deleteMany({
                last_login: { $lt: deletionDate }
            });
            return result;
        }catch(error){
            console.log('Cannot delete old users in manager with mongoose: '+error);
        }
    }

    async deleteById(uId){
        try{
            await managerAccess.saveLog('DELETE a user');
            let result = await this.model.findByIdAndDelete(uId);
            return result;
        }catch(error){
            console.log('Cannot delete the user in manager with mongoose: '+error);
        }
    }

}
