var mysql = require('mysql');

HOST = 'localhost',
PORT = '3306',
USER = 'root',
PASSWORD = '000000',
DATA = 'members'


var read_db = function(sql){
    var connection = mysql.createConnection({
        host:HOST,
        port:PORT,
        user:USER,
        password:PASSWORD,
        database:DATA
    });
    var result = {
        exist:false,
        password:""
    }
    connection.connect();

    connection.query(sql, (err, data, fields)=>{
        if (err){
            console.log(err);
        }
        result.password = data;
        result.exist = true;
    })
    connection.end();

    return result;
}

var write_db = function(id, pwd, name, email, phone, image){
    var sql = `INSERT INTO members (id, pwd, name, email, phone, image) values (?, ?, ?, ?, ?, ?)`;
    var params = [id, pwd, name, email, phone, image];

    var connection = mysql.createConnection({
        host:HOST,
        port:PORT,
        user:USER,
        password:PASSWORD,
        database:DATA
    });
    connection.connect();

    connection.query(sql, params, function(err, rows, fields) {
        if(err){
            connection.end();
            return err;
        }else {
            // console.log(rows);
            connection.end();
            return true;
        }
    });
    connection.end();
}


module.exports = {
    read_db : read_db,
    write_db : write_db,
}