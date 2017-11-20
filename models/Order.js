const Sequelize = require('sequelize')
const db = require('./_db')


const Order = db.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate: {}
    },
    restorantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'restorant_id',

    },
    total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
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
    },
    customer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    }

},

    {
        tableName: 'tbl_order',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
)

module.exports = Order;