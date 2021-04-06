import { v4 as uuidv4 } from 'uuid';
export class Cart {

    constructor(cart = {}) {
        this.cart = cart;
        this.cart.id = uuidv4();
        this.cart.timestamp = new Date().getTime();
        this.cart.products = [];
    }
}