const Sequelize = require('sequelize')
const db = require('./_db')


const Restorant = db.define('Restorant', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            validate: {}
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        commercialName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        legalName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {}
        },
        commercialEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        adminNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {}
        }
    },

    {
        tableName: 'tbl_restorant',
        freezeTableName: true,
        underscored: true,
    }
)

module.exports = Restorant;