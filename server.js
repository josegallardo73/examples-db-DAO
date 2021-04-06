import express from 'express';
const app = express();
import { FactoryCarts, FactoryProducts } from './models/Factories.js';
const PORT = 8080;

app.use(express.json());

const bdProducts = new FactoryProducts(5);
//const bdCarts = new FactoryCarts(7);
//bdProducts.createTable();
//bdCarts.createTable();
const products = [
            {   
                nombre:'XboxOneX', 
                descripcion: 'Consola Microsoft',
                codigo: 1,
                fotoUrl: 'https://picsum.photos/200',
                precio: 279,
                stock: 10
            },
            {   
                nombre:'XboxSeriesS', 
                descripcion: 'Consola Microsoft',
                codigo: 2,
                fotoUrl: 'https://picsum.photos/200',
                precio: 299,
                stock: 12
            },
            {
                nombre:'XboxSeriesX', 
                descripcion: 'Consola Microsoft',
                codigo: 3,
                fotoUrl: 'https://picsum.photos/200',
                precio: 499,
                stock: 20
            },
            {
                nombre:'Playstation 5', 
                descripcion: 'Consola Sony',
                codigo: 4,
                fotoUrl: 'https://picsum.photos/200',
                precio: 499,
                stock: 25
            },
            {
                nombre:'Playstation 5 Digital Edition', 
                descripcion: 'Consola Sony',
                codigo: 5,
                fotoUrl: 'https://picsum.photos/200',
                precio: 399,
                stock: 15
            }
        ];

const product = {   
    nombre:'XboxOneX', 
    descripcion: 'Consola Microsoft',
    codigo: 1,
    fotoUrl: 'https://picsum.photos/200',
    precio: 299,
    stock: 10
} 
const product2 = {   
    nombre:'XboxSeriesS', 
    descripcion: 'Consola Microsoft',
    codigo: 2,
    fotoUrl: 'https://picsum.photos/200',
    precio: 299,
    stock: 12
}

/* const product1 = {id_carrito: 1, id_producto: products[0].id };
const product2 = {id_carrito: 1, id_producto: products[1].id }; */

/* bdProducts.insert(product);
bdProducts.insert(product2); */
/* bdCarts.insert(product1, 'carritos');
bdCarts.insert(product2, 'carritos'); */
/* bdProducts.deleteOne(1, 'productos');
bdProducts.update(2, 'productos', {   
    nombre:'XboxSeriesS', 
    descripcion: 'Consola Microsoft',
    codigo: 2,
    fotoUrl: 'https://picsum.photos/300',
    precio: 279,
    stock: 8
}); */

//bdProducts.select('productos');
//bdProducts.selectName('productos','Playstation 5');
//bdProducts.selectCode('productos', 3);
//bdProducts.selectPrice('productos', 279);
//bdProducts.selectStock('productos', 15);
//bdCarts.select(1,'carritos');
//bdProducts.select();
//bdProducts.selectName('XboxOneX');
//bdProducts.selectCode(1);
//bdProducts.selectPrice(279);
//bdProducts.selectStock(9);
/* bdProducts.update('CPwAoitk6EFc5YkHsar6', {
    fotoUrl: 'https://picsum.photos/300',
    precio: 289,
    stock: 18
}) */
//bdProducts.deleteOne('CPwAoitk6EFc5YkHsar6');
bdProducts.delete();
/* const productMONGO1 = { id_carrito: 1, id_producto: '606b74c6c6a52a1bd5e2a92c' }
const productMONGO2 = { id_carrito: 1, id_producto: '606b74c6c6a52a1bd5e2a92d' }
bdCarts.insert(productMONGO1);
bdCarts.insert(productMONGO2); */
//bdCarts.select(1);

// Ruteo con express

app.get('/productos', (req, res) => {
    const response = bdProducts.select();
    response
        .then((products) => res.send(products))
        .catch((err) => res.send(err));
});

app.post('/productos', (req, res) => {
    const response = req.body;
    bdProducts.insert(response)
        .then((response) => res.send(response))
        .catch((err) => res.send(err));
})

app.put('/productos/:id', (req, res) => {
    const id = req.params.id
    const {fotoUrl, precio, stock} = req.body
    const data = {
        id,
        fotoUrl,
        precio,
        stock
    }
    bdProducts.update(id, data)
        .then(response => res.send(response)) 
        .catch(err => res.send(err))
})

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    bdProducts.deleteOne(id)
        .then((response) => res.send(response))
        .catch((err) => res.send(err));
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
}).on('error', (err) => {
    console.log(err);
})