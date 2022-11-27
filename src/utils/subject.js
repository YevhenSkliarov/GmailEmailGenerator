const { faker } = require('@faker-js/faker');

function createSubject(){
    return faker.name.firstName() + ' ' + faker.name.middleName() + ' ' + faker.name.lastName() + ' ' + faker.address.country();
}

module.exports = createSubject;