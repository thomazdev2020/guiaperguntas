const Sequelize = require('sequelize');
const conn = new Sequelize('guiaperguntas','root','01740301',{
    host:'localhost',
    port:'3307',
    dialect:'mysql',
  
});

module.exports = conn;