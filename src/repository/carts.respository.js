export class CartRepository{
    
    constructor(dao, ticketService, userService){
        this.dao = dao;
        this.ticketService = ticketService;
        this.userService = userService;
    }

    async addCart(){
        const result = await this.dao.post();
        return result;
    }

    async addProduct(idCart, idProduct, quantityBody){
        const result = await this.dao.addProduct(idCart, idProduct, quantityBody);
        return result;
    }

    async getCarts(){
        const result = await this.dao.get();
        return result;
    }

    async getCartById(cid){
        const result = await this.dao.getCart(cid);
        return result;
    }

    async getCartByIdPopulate(cid){
        const result = await this.dao.getCartPopulate(cid);
        return result;
    }

    async updateCart(cid, products){
        const result = await this.dao.put(cid, products);
        return result;
    }

    async updateProduct(cid, pid, quantity){
        const result = await this.dao.putProduct(cid, pid, quantity);
        return result;
    }
    
    async deleteCart(pid){
        const result = await this.dao.delete(pid);
        return result;
    }

    async deleteProductById(cid, pid){
        const result = await this.dao.deleteProduct(cid, pid);
        return result;
    }

    async buyCart(cid, reqUser){
        const resultManager = await this.dao.buy(cid);
        const amount = resultManager[0];
        const user = await this.userService.getByEmail(reqUser.email);
        const purchaser = user.email;
        const result = await this.ticketService.add(amount, purchaser);
        await this.ticketService.updateCode(result);
        if(resultManager[1] === true){
            user.cart = await this.dao.post();
            await this.userService.update(user._id, user);
        }
        return result;
    }

}