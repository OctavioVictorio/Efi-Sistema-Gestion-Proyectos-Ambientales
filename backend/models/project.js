'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
        // Un proyecto tiene muchas tareas
        Project.hasMany(models.Task, {
            foreignKey: 'id_proyecto',
        });
        // Un proyecto tiene muchos recursos
        Project.hasMany(models.Resource, {
            foreignKey: 'id_proyecto',
        });
        }
    }
    Project.init({
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        descripcion: {
        type: DataTypes.TEXT
        },
        fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
        },
        fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
        },
        estado: {
        type: DataTypes.ENUM('activo', 'completado'),
        defaultValue: 'activo'
        },
        ubicacion: {
        type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'Projects',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Project;
};