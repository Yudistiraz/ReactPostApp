import sequelize from "sequelize";

const db = new sequelize('react_posterapp','root','',{
    host: 'localhost',
    dialect : 'mysql'
});

export default db;