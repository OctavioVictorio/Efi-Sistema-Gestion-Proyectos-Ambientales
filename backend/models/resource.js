'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Resource extends Model {
        static associate(models) {
        // Un recurso pertenece a un proyecto
        Resource.belongsTo(models.Project, {
            foreignKey: 'id_proyecto',
        });
        }
    }
    Resource.init({
        tipo: {
        type: DataTypes.STRING,
        allowNull: false
        },
        cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Resource',
        tableName: 'Resources',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Resource;
};