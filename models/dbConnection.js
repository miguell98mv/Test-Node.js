'use strict'

const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const dbOptions = {
		host : dbConfig.mysql.host,
		port : dbConfig.mysql.port,
		user : dbConfig.mysql.user,
		password : dbConfig.mysql.pass,
		database : dbConfig.mysql.db
	}

const connection = mysql.createConnection(dbOptions);

connection.connect((err) => {
	return (err) ? console.log(`Error al Conectarse a MySQL`) : console.log(`Conexión establecida con MySQL`)
})

module.exports = connection