const Sequelize = require('sequelize')
const db = require('./_db')


const OrderDetail = db.define('OrderDetail', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate: {}
    },
    meal: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {}
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {}
    },
    subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {}
    },
},

    {
        tableName: 'tbl_order_detail',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
)

module.exports = OrderDetail;