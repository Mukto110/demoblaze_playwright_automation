import { Page } from "@playwright/test";
import "dotenv/config";

export class EnvData {
  readonly baseUrl: string;
  readonly cartUrl: string;
  readonly firstProductUrl: string;
  readonly username: string;
  readonly password: string;
  
  
  constructor(page: Page) {
    this.baseUrl = process.env.BASE_URL!;
    this.cartUrl = process.env.CART_URL!;
    this.firstProductUrl = process.env.FIRST_PRODUCT_URL!;
    this.username = process.env.USERNAME!;
    this.password = process.env.PASSWORD!;
  }
}
