const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "", {
   host: "localhost",
   dialect: "mysql",
});

try {
   sequelize.authenticate();
} catch (error) {
   console.log(`NÃO FOI POSSÍVEL CONECTAR AO BANCO ${error}`);
}

module.exports = sequelize;
