const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {
  constructor(){
  }

  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories; 
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category){
      boom.notFound("category not found");
    }
    return category;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return id;
  }
}

module.exports = CategoryService;