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
            field: 'commercial_name'
        },
        legalName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'legal_name'
        },
        commercialEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'commercial_email'
        },
        adminNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'admin_number'
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
        timestamps: false
        
    }
)

module.exports = Restorant;