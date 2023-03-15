import sequelize from "sequelize";
import db from "../config/Database.js"
import Posts from "./PostModel.js";

const {DataTypes} = sequelize;

const Users = db.define('users', {
    name:{
        type : DataTypes.STRING
    },
    email:{
        type : DataTypes.STRING
    },
    password:{
        type : DataTypes.STRING
    },
    refresh_token:{
        type : DataTypes.TEXT
    }
},{
    freezeTableName: true
})

Users.hasMany(Posts);

export default Users;

(async () => {
    await db.sync();
}) ();