import { Page } from "@playwright/test";
import "dotenv/config";

export class EnvData {
  readonly baseUrl: string;
  constructor(page: Page) {
    this.baseUrl = process.env.BASE_URL!;
  }
}
