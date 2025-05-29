import { Page } from "@playwright/test";

export class AboutModal {
  readonly title: string;
  readonly video: string;
  readonly playButton: string;
  readonly closeButton: string;

  constructor(page: Page) {
    this.title = `css=h5[id='videoModalLabel']`;
    this.video = `css=div[class='form-group'] video[id='example-video_html5_api']`;
    this.playButton = `css=div[class='vjs-control-bar'] button[title='Play']`;
    this.closeButton = `css=div[id='videoModal'] div[class='modal-footer'] button[type='button']`;
  }
}
