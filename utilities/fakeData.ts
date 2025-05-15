import { faker } from "@faker-js/faker";

export const fakeUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  zip: faker.location.zipCode(),
  mobile: faker.phone.number(),
};
