import { Page } from "@playwright/test";

export class ContactModal {
  readonly header: string;
  readonly closeButton: string;
  readonly emailInputLabel: string;
  readonly emailInput: string;
  readonly nameInputLabel: string;
  readonly nameInput: string;
  readonly messageInputLabel: string;
  readonly messageTextarea: string;
  readonly sendButton: string;

  constructor(page: Page) {
    this.header = `css=h5[id='exampleModalLabel']`;
    this.closeButton = `xpath=/html[1]/body[1]/div[1]/div[1]/div[1]/div[3]/button[1]`;
    this.emailInputLabel = `xpath=//label[normalize-space()='Contact Email:']`;
    this.emailInput = `css=input[id='recipient-email']`;
    this.nameInputLabel = `xpath=//label[normalize-space()='Contact Name:']`;
    this.nameInput = `css=input[id='recipient-name']`;
    this.messageInputLabel = `css=div[class='form-group'] label[for='message-text']`;
    this.messageTextarea = `css=textarea[id='message-text']`;
    this.sendButton = `css=button[onclick='send()']`;
  }
}
