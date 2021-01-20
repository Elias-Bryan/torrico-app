const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(bodyParser.json());
//Route
app.get('/',(req, res)=>{
    res.send('Server on');
});

//crud
app.get('/clientes',(req, res)=>{
    const sql ='SELECT * FROM clientes';

    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        } else {
            res.send('No hay resultados')
        }
    });
    
});

app.get('/clientes/:id',(req, res)=>{
   const { id } = req.params;
   const sql = `SELECT * FROM clientes WHERE id = ${id}`;
   connection.query(sql, (error, results)=>{
    if (error) throw error;

    if (results.length > 0){
        res.json(results);
    } else {
        res.send('No hay resultados')
    }
});

});

app.post('/add',(req, res)=>{
    const sql = 'Insert into clientes set ?';

    const clienteObj = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };
    connection.query(sql, clienteObj, error => {
        if (error) throw error;
        res.send('Cliente creado');
    });    
});

app.put('/update/:id', (req, res)=>{
    const { id } = req.params;
    const {nombre, descripcion } = req.body;
    const sql = `UPDATE clientes SET nombre = '${nombre}', descripcion = '${descripcion}' where id =${id}`;
    connection.query(sql, error=>{
        if (error) throw error;
        res.send('cliente editado')
    });
    
});

app.delete('/delete/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id =${id}`;
    connection.query(sql, error=>{
        if (error) throw error;
        res.send('cliente eliminado')
    });
});

//Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'lab15'
});

//Check connect
connection.connect(error=> {
   if (error) throw error;
   console.log('Database server running!');
});

app.listen(PORT, ()=>console.log(`server corriendo en el puerto ${PORT}`));