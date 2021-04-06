import { v4 as uuidv4 } from 'uuid';
export class Product {

    constructor(product = {}) {
        this.product = product;
        this.products = [];
    }
}


