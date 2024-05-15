//Knex sirve para poder realizar instancias de mysql con lenguaje Js
const config = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection:{
            host : DB_HOST,
            port : 3306,
            user : DB_USER,
            password : DB_PASS,
            database : DB,
        }
    })
    //Crear y Leer usuarios
    const table1 = 'usuario'
    const nuevoUsuario = () =>{
        return knex.schema.createTable(table1, (table) => {
            table.varchar('nombre_usuario')
            table.varchar('correo')
            table.varchar('contrasena')
            table.varchar('rol')
            table.primary('nombre_usuario')
        })
    }

    const crearUsuario = ({ nombre_usuario, correo, contrasena, rol  }) => {
        return knex(table1).insert({
            nombre_usuario: nombre_usuario,
            correo: correo,
            contrasena: contrasena,
            rol: rol,
        });
    };
    //const leerUser_res = () =>{
      //  return knex(table1).select('usuario.nombre_usuario','usuario.correo','propiedad.region', 'propiedad.comuna', 'propiedad.calle', 'propiedad.numero', 'propiedad.cant_habitaciones', 'propiedad.comuna', 'reserva.fecha_inicio', 'reserva.fecha_final').join('reserva', {'usuario.nombre_usuario':'reserva.nombre_usuario'}).join('propiedad', {'reserva.id_propiedad': 'propiedad.id_propiedad'});
    //}
    const leerUsuario = () =>{
        return knex(table1).select()
    }

    const borrarUsuario = (nombre_usuario) => {
        return knex(table1).delete().where({'nombre_usuario': nombre_usuario})
    }
    
    //Crear y leer Vehiculos
    const table2 = 'vehiculos'
    const nuevoVehiculo = () =>{
        return knex.schema.createTable(table2, (table) => {
            table.increments('id_vehiculo')
            table.varchar('modelo')
            table.varchar('precio')
            table.primary('id_equipo')
        })
    }

    const crearVehiculo = ({ id_vehiculo, modelo, precio }) => {
        return knex(table2).insert({
            id_vehiculo: id_vehiculo,
            modelo: modelo,
            precio: precio,
        });
    };

    const leerVehiculos = () =>{
        return knex(table2).select();
    }
    
    const borrarVehiculos = (id_equipo) => {
        return knex(table2).delete().where({'id_equipo': id_equipo})
    }

    //Crear y leer Repuestos
    const table3 = 'repuestos'
    const nuevoRepuesto = () =>{
        return knex.schema.createTable(table3, (table) => {
            table.increments('id_repuesto')
            table.varchar('nombre_repuesto')
            table.integer('precio_repuesto')
            table.primary('id_repuesto')
        })
    }

    const crearRespuesto = ({ id_repuesto, nombre_repuesto, precio_repuesto }) => {
        return knex(table3).insert({
            id_repuesto: id_repuesto,
            nombre_repuesto: nombre_repuesto,
            precio_repuesto:precio_repuesto,
        });
    };

    const leerRespuestos = () =>{
        return knex(table3).select();
    }

    const eliminarRespuestos = (id_servicio) =>{
        return knex(table3).delete().where({'id_servicio': id_servicio})
    }

    //Crear y leer Articulos
    const table4 = 'articulos'
    const nuevoArticulo = () =>{
        return knex.schema.createTable(table4, (table) => {
            table.increments('id_articulo')
            table.varchar('detalle_articulo')
            table.integer('precio')
            table.primary('id_articulo')
        })
    }
    const crearArticulo = ({ rut_empresa, razon_social }) => {
        return knex(table4).insert({
            rut_empresa: rut_empresa,
            razon_social: razon_social
        });
    };

    const leerArticulo = () =>{
        return knex(table4).select();
    }

    const eliminarArticulo = (rut_empresa) =>{
        return knex(table4).delete().where({'rut_empresa': rut_empresa})
    }


    return{
        nuevoUsuario, crearUsuario, leerUsuario, borrarUsuario, nuevoVehiculo, crearVehiculo,leerVehiculos, borrarVehiculos,
        nuevoRepuesto, crearRespuesto, leerRespuestos, eliminarRespuestos, nuevoArticulo, crearArticulo, leerArticulo, eliminarArticulo
    };
};

module.exports = {
    config
};