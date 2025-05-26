import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";

export class FakeUser {
  username: string;
  email: string;
  password: string;
  message: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;

  constructor(page: Page) {
    this.username = faker.internet.username();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.message = faker.lorem.sentence(1);
    this.country = faker.lorem.sentence(1);
    this.city = faker.lorem.word(1);
    this.card = faker.lorem.word();
    this.month = faker.lorem.word();
    this.year = faker.lorem.word();
  }
}
