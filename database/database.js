// sequelize conexão com o banco de dados
const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','01740301',{
    host: 'localhost',
    port: '3307',
    dialect: 'mysql'
});

module.exports = connection;