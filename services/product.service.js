const boom = require('@hapi/boom');
//const pool = require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize');
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

  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
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
