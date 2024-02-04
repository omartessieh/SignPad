import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //ionic g module components
  //ionic g component components/sign-pad
  //npm i angular2-signaturepad --force
  //npm install @capacitor/android --force
  //npx cap add android

  image: any;

  constructor() { }

  signImage(event: any) {
    this.image = event;
    console.log(this.image);
  }
}
