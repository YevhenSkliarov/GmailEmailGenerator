const { faker } = require('@faker-js/faker');

function createMessage(){
    return `Hi Howard G. Cummings. This is an email with files. Please review them. 
    If you have any questions please contact me by this email ${faker.internet.email()}.
    There is my address ${faker.address.country()} ${faker.address.cityName()} ${faker.address.streetAddress()}`
}

module.exports = createMessage;