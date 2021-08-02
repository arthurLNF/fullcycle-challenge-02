const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')

var connection = mysql.createConnection(config)
let sql = `INSERT INTO people(name) VALUES('João')`
connection.query(sql)
sql = `INSERT INTO people(name) VALUES('Pedro')`
connection.query(sql)
sql = `INSERT INTO people(name) VALUES('Paulo')`
connection.query(sql)
sql = `INSERT INTO people(name) VALUES('Lucas')`
connection.query(sql)

connection.end()

function fetchPeople(callback) {
    var connection = mysql.createConnection(config)
    connection.query('SELECT * FROM people', function(err, rows) {
        if (err) {
            callback(err, null);
        } else 
            callback(null, rows);
    });
}

app.get('/', (req, res) => {
    fetchPeople(function(err, data){        
        let response = "<h1>Full Cycle Rocks!!!</h1>"
        response += "<ul>"
        data.forEach(person => {
            response += `<li>${person.name}</li>`
        });
        response += "</ul>"
        res.send(response)
    })
})

app.listen(port, () => {
    console.log("Rodando na porta" + port)
})