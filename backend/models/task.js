'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
        // Una tarea pertenece a un proyecto
        Task.belongsTo(models.Project, {
            foreignKey: 'id_proyecto',
        });
        // Una tarea puede estar asignada a un usuario (voluntario)
        Task.belongsTo(models.User, {
            foreignKey: 'asignado_a',
        });
        }
    }
    Task.init({
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        descripcion: {
        type: DataTypes.TEXT
        },
        fecha_limite: {
        type: DataTypes.DATEONLY,
        allowNull: false
        },
        estado: {
        type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
        defaultValue: 'pendiente'
        }
    }, {
        sequelize,
        modelName: 'Task',
        tableName: 'Tasks',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Task;
};