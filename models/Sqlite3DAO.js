import knex from 'knex';

const options = { client: 'sqlite3', connection: {filename: 'sqlite3BD/ecommerce.sqlite' }, useNullAsDefault: true}
const connection = knex(options);


export class Sqlite3Product {

    createTable() {

        connection.schema.createTable('productos', table => {
            table.increments('id');
            table.timestamp('fecha_creacion').notNullable().defaultTo(connection.fn.now());
            table.string('nombre').notNullable();
            table.string('descripcion');
            table.string('codigo').notNullable();
            table.string('fotoUrl');
            table.integer('precio').notNullable();
            table.integer('stock').notNullable();
            }) 
                .then(() => console.log('Table productos created!'))
                .catch((err =>  { console.log(err); throw err; }))
        }

    insert(content, table) {
        if(typeof content === 'object') connection(`${table}`).insert(content)
            .then(() => console.log('content inserted!'))
            .catch((err) => { console.log(err); throw err; })
        else {
            console.log('El contenido no es del tipo object');
        }
    }

    select(table) {
        connection(`${table}`).select('*')
            .then((items) => {
                items.forEach(item => {
                    console.log(item.id, item.fecha_creacion, item.nombre, item.descripcion, item.codigo, item.fotoUrl, item.precio, item.stock);
                })
            })
            .catch((err) => { console.log(err); throw err; })
    }

    selectName(table, name) {
        connection(`${table}`).where('nombre', name).select('*')
            .then((response) => {
                const item = response[0];
                console.log(item.id, item.fecha_creacion, item.nombre, item.descripcion, item.codigo, item.fotoUrl, item.precio, item.stock);
            })
            .catch((err) => { console.log(err); throw err; })
    }

    selectCode(table, code) {
        connection(`${table}`).where('codigo',code).select('*')
            .then((response) => {
                const item = response[0];
                console.log(item.id, item.fecha_creacion, item.nombre, item.descripcion, item.codigo, item.fotoUrl, item.precio, item.stock);
            })
            .catch((err) => { console.log(err);throw err; })
    }

    selectPrice(table, startPrice) {
        connection(`${table}`).where('precio', '>' , startPrice).select('*')
            .then((items) => {
                items.forEach(item => {
                    console.log(item.id, item.fecha_creacion, item.nombre, item.descripcion, item.codigo, item.fotoUrl, item.precio, item.stock);
                })
            })
            .catch((err) => { console.log(err); throw err; })
    }

    selectStock(table, startStock) {
        connection(`${table}`).where('stock', '>' , startStock).select('*')
            .then((items) => {
                items.forEach(item => {
                    console.log(item.id, item.fecha_creacion, item.nombre, item.descripcion, item.codigo, item.fotoUrl, item.precio, item.stock);
                })
            })
            .catch((err) => { console.log(err); throw err; })
    }

    update(id, table, data) {
        const {fotoUrl, precio, stock} = data;
        connection(`${table}`).where('id', id).update({fotoUrl: fotoUrl, precio:precio,  stock: stock})
            .then(() => console.log('content updated!'))
            .catch((err) => { console.log(err); throw err; })
    }

    deleteOne(id, table) {
        connection(`${table}`).where('id', id).del()
            .then(() => console.log('content deleted!'))
            .catch((err) => { console.log(err); throw err; })
    }

    delete(table) {
        connection(`${table}`).del()
            .then(() => console.log(`table ${table} deleted!`))
            .catch((err) => { console.log(err); throw err; })
    }
}

export class Sqlite3Cart {

    createTable() {

        connection.schema.createTable('carritos', table => {
            table.increments('id');
            table.timestamp('fecha_creacion').notNullable().defaultTo(connection.fn.now());
            table.integer('id_carrito').notNullable();
            table.integer('id_producto').notNullable();
        })
            .then(() => console.log('Table carritos created!'))
            .catch((err) => { console.log(err); throw err; })
    }

    insert(content, table) {
        if(typeof content === 'object') connection(`${table}`).insert(content)
            .then(() => console.log('content inserted!'))
            .catch((err) => { console.log(err); throw err; })
        else {
            console.log('El contenido no es del tipo object');
        }
    }

    deleteOne(id_producto, table) {
        connection(`${table}`).where('id_producto', id_producto).del()
            .then(() => console.log('content deleted!'))
            .catch((err) => { console.log(err); throw err; })
    }

    delete(table) {
        connection(`${table}`).del()
            .then(() => console.log('all content deleted!'))
            .catch((err) => { console.log(err); throw err; })
    }

    select(id_carrito, table) {
        connection(`${table}`).select('id_producto').where('id_carrito', id_carrito)
            .then((items) => {
                items.forEach(item => {
                    console.log(item.id_producto);
                })
            })
            .catch((err) => { console.log(err); throw err; })
    }
}