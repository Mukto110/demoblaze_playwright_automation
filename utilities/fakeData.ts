import { faker } from "@faker-js/faker";

export class FakeUser {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.username = faker.internet.username();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }
}
