import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";

export class FakeUser {
  username: string;
  email: string;
  password: string;

  constructor(page: Page) {
    this.username = faker.internet.username();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }
}
