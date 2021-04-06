import fs from 'fs';
import admin from "firebase-admin";
const serviceAccount  = JSON.parse(fs.readFileSync('firebaseConfig/crud-firebase-js-861e7-firebase-adminsdk-s8on1-8be42ee1b3.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "crud-firebase-js-861e7.firebaseio.com"
});

export class FirebaseProduct {

  constructor() {
    this.db = admin.firestore();
    this.collection = this.db.collection('productos');
  }
    
  insert(content) {
    const {nombre, descripcion, codigo, fotoUrl, precio, stock} = content;
    const response = new Promise((resolve, reject) => {
        let document = this.collection.doc();
        const createContent = document.create({ fecha_creacion: admin.firestore.FieldValue.serverTimestamp(), nombre: nombre, descripcion: descripcion, codigo: codigo, fotoUrl: fotoUrl, precio: precio, stock: stock })
        if(createContent) resolve({ success: 'Se ha agregado un nuevo producto correctamente'})
        else reject({ error: 'No se ha podido agregar un producto correctamente'})
    })
    return response;
  }

  select() {
      this.collection.get()
          .then((items) => 
            items.docs.map(item => console.log({
              id: item.id,
              fecha_creacion: item.data().fecha_creacion,
              nombre: item.data().nombre,
              codigo: item.data().codigo,
              fotoUrl: item.data().fotoUrl,
              precio: item.data().precio,
              stock: item.data().stock
            })))
          .catch((err) => {console.log(err); throw err;})
  }

  selectName(name) {
    this.collection.get()
      .then((items) => {
        const response = items.docs.filter(item => item.data().nombre == name)
        response.map(item => console.log({
          id: item.id,
          fecha_creacion: item.data().fecha_creacion,
          nombre: item.data().nombre,
          codigo: item.data().codigo,
          fotoUrl: item.data().fotoUrl,
          precio: item.data().precio,
          stock: item.data().stock
        }))
      })
      .catch((err) => { console.log(err); throw err; } );
  }

  selectCode(code) {
    this.collection.get()
      .then((items) => {
        const response = items.docs.filter(item => item.data().codigo == code)
        response.map(item => console.log({
          id: item.id,
          fecha_creacion: item.data().fecha_creacion,
          nombre: item.data().nombre,
          codigo: item.data().codigo,
          fotoUrl: item.data().fotoUrl,
          precio: item.data().precio,
          stock: item.data().stock
        }))
      })
      .catch((err) => { console.log(err); throw err; } );
  }

  selectPrice(startPrice) {
    this.collection.get()
      .then((items) => {
        const response = items.docs.filter(item => item.data().precio > startPrice)
        response.map(item => console.log({
          id: item.id,
          fecha_creacion: item.data().fecha_creacion,
          nombre: item.data().nombre,
          codigo: item.data().codigo,
          fotoUrl: item.data().fotoUrl,
          precio: item.data().precio,
          stock: item.data().stock
        }))
      })
      .catch((err) => { console.log(err); throw err; } );
}

selectStock(startStock) {
  this.collection.get()
  .then((items) => {
    const response = items.docs.filter(item => item.data().stock > startStock)
    response.map(item => console.log({
      id: item.id,
      fecha_creacion: item.data().fecha_creacion,
      nombre: item.data().nombre,
      codigo: item.data().codigo,
      fotoUrl: item.data().fotoUrl,
      precio: item.data().precio,
      stock: item.data().stock
    }))
  })
  .catch((err) => { console.log(err); throw err; } );
  }

  update(id, data) {
      const {fotoUrl, precio, stock} = data;
      const document = this.collection.doc(`${id}`);
      const update = document.update({fotoUrl: fotoUrl, precio: precio, stock: stock})
      update
        .then(resp => console.log(resp))
        .catch((err) => { console.log(err); throw err; })
  }

  deleteOne(id) {
    const document = this.collection.doc(`${id}`);
    const remove = document.delete()
    remove
      .then(resp => console.log(resp))
      .catch((err) => { console.log(err); throw err; })
  }

delete() {
    this.collection.get()
      .then((items) => {
        items.forEach(doc => {
          doc.ref.delete();
        }) 
      })
      .catch((err) => { console.log(err); throw err; })
  }
}

export class FirebaseCart {

}