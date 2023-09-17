//import { CreateUserDto, GetUserDto } from "../dao/dto/user.dto.js"; HACER QUE EL TITULO SE ESCRIBA LA PRIMERA EN MAYUS Y LUEGO EN MINUS
import { config } from '../config/config.js';
import { transporter } from "../utils/email.js";
import UserManager from '../dao/managers/UserManager.js';

const userManager = new UserManager();

export class ProductRepository {

    constructor(dao) {
        this.dao = dao;
    }

    async addProduct(product) {
        //const productDto = new CreateProductDto(product);
        const result = await this.dao.post(product);
        return result;
    }

    async getProducts(query, options) {
        const result = await this.dao.get(query, options);
        return result;
    }

    async getProductById(pid) {
        const result = await this.dao.getProduct(pid);
        return result;
    }

    async updateProduct(pid, product) {
        const result = await this.dao.put(pid, product);
        return result;
    }

    async deleteProductById(pid) {
        const result = await this.dao.delete(pid);
        if(result != null || result != undefined){
            if(result.owner){
                const owner = await userManager.getById(result.owner);
                if (owner.role === "premium") {
                    const emailOwner = owner.email;
                    const content = await transporter.sendMail({
                        from: config.gmail.emailAdmin,
                        to: emailOwner,
                        subject: "⚠️Your product has been removed🚮",
                        html: `<div>
                            <h1>Your product has been removed</h1>
                            <img src="https://i.pinimg.com/550x/bd/a8/db/bda8db8694801d590217439017bdff26.jpg" style="width:250px"/>
                            <p>If you have any questions, contact the site administrator</p>
                            </div>`
                    });
                }
            }
        }
        return result;
    }

}