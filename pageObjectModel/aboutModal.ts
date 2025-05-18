import { Page } from "@playwright/test";

export class AboutModal {
  readonly title: string;
  readonly video: string;
  readonly playButton: string;
  readonly closeButton: string;

  constructor(page: Page) {
    this.title = `css=h5[id='videoModalLabel']`;
    this.video = `css=div[aria-label='Modal Window'] div[role='document']`;
    this.playButton = `css=div[aria-label='Modal Window'] div[role='document']`;
    this.closeButton = `css=div[id='videoModal'] div[class='modal-footer'] button[type='button']`;
  }
}
