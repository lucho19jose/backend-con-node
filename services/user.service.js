const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for(let index =0; index < limit; index++){
      this.users.push({
        userId: faker.datatype.uuid(),
        user: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    }
  }

  async create(data) {
    const newUser = models.User.create(data);
    return newUser;
  }

  async find(){
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      boom.notFound('user not found');
    }
    return user;
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

module.exports = UserService;
