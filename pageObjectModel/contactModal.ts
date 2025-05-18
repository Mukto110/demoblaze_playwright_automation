import { Page } from "@playwright/test";

export class ContactModal {
  readonly title: string;
  readonly closeButton: string;
  readonly emailInput: string;
  readonly nameInput: string;
  readonly messageTextarea: string;
  readonly sendButton: string;

  constructor(page: Page) {
    this.title = `css=h5[id='exampleModalLabel']`;
    this.closeButton = `css=div[id='exampleModal'] div[class='modal-footer'] button:nth-child(1)`;
    this.emailInput = `css=input[id='recipient-email']`;
    this.nameInput = `css=input[id='recipient-name']`;
    this.messageTextarea = `css=textarea[id='message-text']`;
    this.sendButton = `xpath=//button[normalize-space()='Send message']`;
  }
}
