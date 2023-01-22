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
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find(){
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    /* try { */
      const user = this.users.find(user => user.userId == id)
      if(user) {
        return user;
      }else{
        throw boom.notFound("User not Found");
      }
    /* } catch (error) {
      throw boom.badRequest("IDK what happend");
    } */
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.userId === id);
    if(index === -1) {
      throw boom.notFound("User not found");
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.userId == id);
    if(index === -1){
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
