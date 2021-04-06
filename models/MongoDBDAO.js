import mongoose from 'mongoose';

const URL = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => 'conexion exitosa a la base datos!')
    .catch((err) => console.log(err));

export class MongoDBProduct {

    constructor() {
        this.productosCollection = 'productos';
        this.ProductoSchema = new mongoose.Schema({
            fecha_creacion: {type: Date, default: Date.now },
            nombre : { type: String, require: true, max: 150 },
            descripcion: { type: String, require: true, max: 250 },
            codigo: { type: String, require: true },
            fotoUrl: { type: String, require: false, max: 150 },
            precio: { type: Number, require: true, max: 100000 },
            stock: { type: Number, require: true, max: 1000000 },
        })
        this.model = mongoose.model(this.productosCollection, this.ProductoSchema)
    }


    insert(content) {
        const response = new Promise((resolve, reject) => {
            const contentModel = this.model;
            const contentSave = new contentModel(content)
            if(contentSave.save()) resolve({ success: 'Se ha podido crear el producto' });
            else reject( {error: 'No se ha podido crear el producto' });
        })
        return response;
    }

    select() {
        const response = new Promise((resolve, reject) => {
            const contentRead = this.model.find({})
            resolve(contentRead)
            if(!contentRead) reject({ error: 'No existen productos' });
        })
        return response;
    }

    selectName(name) {
        const contentFind = this.model.find({ nombre: name })
        contentFind
            .then((item) => console.log(item))
            .catch((err) => { console.log(err); throw err; })
    }

    selectCode(code) {
        const contentFind = this.model.find({ codigo: code })
        contentFind
            .then((item) => console.log(item))
            .catch((err) => { console.log(err); throw err; })
    }

    selectPrice(startPrice) {
        const contentRange = this.model.find({"precio": { $gt: startPrice }})
        contentRange
            .then((items) => console.log(items))
            .catch((err) => { console.log(err); throw err; })
    }

    selectStock(startStock) {
        const contentRange = this.model.find({"stock": { $gt: startStock }})
        contentRange
            .then((items) => console.log(items))
            .catch((err) => { console.log(err); throw err; })
    }

    update(id, data) {
        const {fotoUrl, precio, stock } = data;
        const response = new Promise((resolve, reject) => {
            const contentUpdate = this.model.updateOne({_id: id} , { $set: {fotoUrl: fotoUrl, precio: precio, stock: stock}})
            resolve({ success: 'Se ha actualizado el producto correctamente'});
            reject({ error: 'No se ha podido actualizar el producto' })
        })
        return response;
    }

    deleteOne(id) {
        const promise = new Promise((resolve, reject) => {
            const contentDeleteOne = this.model.deleteOne({ _id: id })
            contentDeleteOne
                .then(resolve({ success: 'Se ha podido eliminar el producto correctamente' }))
            .catch(reject ({error: 'No se ha podido eliminar el producto'}))
        })
        return promise;
    }

    delete() {
        const contentDeleteAll = this.model.deleteMany({})
        contentDeleteAll
            .then((response => console.log(response)))
            .catch((err) => {console.log(err); throw err;})
    }
}

export class MongoDBCart {

    constructor() {
        this.carritosCollection = 'carritos';
        this.CarritoSchema = new mongoose.Schema({
            fecha_creacion: {type: Date, default: Date.now },
            id_carrito : { type: Number, require: true, max: 100000 },
            id_producto: { type: String, require: false, max: 1000 },
        })
        this.model = mongoose.model(this.carritosCollection, this.CarritoSchema)
    }

    insert(content) {
        const contentModel = this.model;
        const contentSave = new contentModel(content)
        contentSave.save()
            .then(() => console.log('content inserted!'))
            .catch((err) => { console.log(err); throw err })
    }

    select(id_carrito) {
        const contentRead = this.model.find({ id_carrito: id_carrito })
        contentRead
            .then((items) => console.log(items))
            .catch((err) => { console.log(err); throw err; })
    }

    deleteOne(id_producto) {
        const contentDeleteOne = this.model.deleteOne({ id_producto: id_producto })
        contentDeleteOne
            .then(response => console.log(response))
            .catch((err) => { console.log(err); throw err; })
    }

    delete() {
        const contentDeleteAll = this.model.deleteMany({})
        contentDeleteAll
            .then((response => console.log(response)))
            .catch((err) => {console.log(err); throw err;})
    }
}