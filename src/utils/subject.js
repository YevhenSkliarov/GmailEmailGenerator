import { faker } from '@faker-js/faker';

export default function createSubject(){
    return faker.name.firstName() + ' ' + faker.name.middleName() + ' ' + faker.name.lastName() + ' ' + faker.address.country();
}