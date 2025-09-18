'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // Definir las relaciones aquí
        User.hasMany(models.Task, { foreignKey: 'asignado_a' });
        }
    }
    User.init({
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
        },
        contraseña: {
        type: DataTypes.STRING,
        allowNull: false
        },
        rol: {
        type: DataTypes.ENUM('admin', 'gestor', 'voluntario'),
        allowNull: false
        },
        is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return User;
};