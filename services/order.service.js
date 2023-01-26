const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {

  }

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  
  async addItem(data){ // newOrderProduct -> item
    const newOrderProduct = await models.OrderProduct.create(data);
    return newOrderProduct;
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order) {
      boom.notFound("there is not this order in the table");
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes
    }
  };
}

module.exports = OrderService;