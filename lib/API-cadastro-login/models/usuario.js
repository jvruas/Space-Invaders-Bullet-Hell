"use strict";

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let tb_user = sequelize.define(
        "tb_user",
        {
            idUser: {
                field: "idUser",
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                field: "userName",
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                field: "password",
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                field: "email",
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "tb_user",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    return tb_user;
};
