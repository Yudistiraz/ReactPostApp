import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Post = db.define('post',{
    name : DataTypes.STRING,
    image : DataTypes.STRING,
    url : DataTypes.STRING,
    content : DataTypes.TEXT

},{
    freezeTableName: true,
});

export default Post;

(async () => {
    await db.sync();
}) ();