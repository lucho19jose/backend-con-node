const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');

class ProductService {

  constructor(){
    this.products = [];
    /* this.pool = pool;
    this.pool.on('error', (err) => console.error(err)); */
  };

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    }
    const { limit, offset} = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price_min, price_max } = query;
    //const { price } = query;
    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = ProductService;
