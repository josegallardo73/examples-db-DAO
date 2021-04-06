import { Cart } from './Cart.js';
import { Product } from './Product.js';
import { mysqlProduct, mysqlCart } from './MysqlDAO.js';
import { mysqlProductCloud, mysqlCartCloud } from './MysqlCloudDAO.js';
import { Sqlite3Product, Sqlite3Cart } from './Sqlite3DAO.js';
import { MongoDBProduct, MongoDBCart } from './MongoDBDAO.js';
import { FirebaseProduct, FirebaseCart } from './FirebaseDAO.js';

export class FactoryProducts {

    constructor(type) {
        switch(type) {
            case 0: 
                return new Product();
            case 1:
                return new FsProduct(); break;
            case 2:
                return new mysqlProduct(); break;
            case 3:
                return new mysqlProductCloud(); break;
            case 4: 
                return new Sqlite3Product(); break;
            case 5:
                return new MongoDBProduct(); break;
            case 7:
                return new FirebaseProduct(); break;
            default:
                console.log('Opción seleccionada inválida'); break;
        }
    }
}

export class FactoryCarts {
    constructor(type) {
        switch(type) {
            case 0: 
                return new Cart();
            case 1:
                return new FsCart(); break;
            case 2:
                return new mysqlCart(); break;
            case 3:
                return new mysqlCartCloud(); break;
            case 4: 
                return new Sqlite3Cart(); break;
            case 5:
                return new MongoDBCart(); break;
            case 7:
                return new FirebaseCart(); break;
            default:
                console.log('Opción seleccionada inválida'); break;
        }
    }
}